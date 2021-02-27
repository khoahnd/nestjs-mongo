import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@entities/user.entity';
import { Repository } from 'typeorm';
import { classToPlain } from 'class-transformer';
import { Encrypt, Exception, Token } from '@api/helpers';
import {
  UserAuthLoginRequest,
  UserAuthLoginResponse,
  UserRespone,
} from '@api/dtos';
import { AuthService } from '../abstract';
import { UserStatusEnum } from '~/api/enums';
import { authError } from '@api/common';

@Injectable()
export class UserAuthService extends AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {
    super();
  }

  /**
   * @method
   * @name login
   * @access public
   * @description Handles login requests of the user.
   * @param {Object} identity
   * @param {string} identity.email      The email of the user.
   * @param {string} identity.password   The password of the user.
   * @return {Promise<UserAuthLoginResponse>}
   */
  async login(identity: UserAuthLoginRequest): Promise<UserAuthLoginResponse> {
    const { email, password } = identity;
    const user = await this.userEntity.findOne({ where: { email } });

    if (!user) {
      Exception.notFound(authError.ERR_EMAIL_INCORRECT);
    }

    const validPwd = Encrypt.compare(password, user.password);
    if (!validPwd) {
      Exception.badRequest(authError.ERR_PASSWORD_INCORRECT);
    }

    return this._generateToken(user);
  }

  /**
   * @method
   * @name _generateToken
   * @access private
   * @desciption Handle the generated token.
   * @param {User} user The user.
   * @return {<UserAuthLoginResponse>}
   */
  private _generateToken(user: UserEntity): UserAuthLoginResponse {
    const { _id, roles } = user;

    const [accessToken, refreshToken] = [
      Token.signAccessToken({ userId: _id, roles }),
      Token.signRefreshToken({ userId: _id, roles }),
    ];

    return {
      accessToken: accessToken.token,
      expiredTime: accessToken.ttl,
      refreshToken: {
        token: refreshToken.token,
        expiredTime: refreshToken.ttl,
      },
      user: <UserRespone>classToPlain(user),
    };
  }

  /**
   * @method
   * @override
   * @name verifyUser
   * @access public
   * @desciption Handle verify user.
   * @param {Request} req The request.
   * @return {<UserRespone>}
   */
  async verifyUser(token: string): Promise<UserRespone> {
    try {
      const payload = await Token.verifyAccessToken(token);
      if (!payload || !payload.userId || !payload.roles) {
        Exception.unauthorized(authError.ERR_TOKEN_IS_NOT_VALID);
      }
      const user = await this.userEntity.findOne(payload.userId);
      if (!user) {
        Exception.unauthorized(authError.ERR_INVALID_AUTHORIZATION);
      }
      if (user.status != UserStatusEnum.ACTIVE) {
        Exception.unauthorized(authError.ERR_INVALID_AUTHORIZATION);
      }
      return <UserRespone>classToPlain(user);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        Exception.unauthorized(authError.ERR_ACCESS_TOKEN_EXPIRED);
      }
      Exception.unauthorized(authError.ERR_TOKEN_IS_NOT_VALID);
    }
  }
}
