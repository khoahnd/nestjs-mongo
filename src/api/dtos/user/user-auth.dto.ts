import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { UserRespone } from './user.dto';

/**
 * @class
 * @private
 * @name RefreshToken
 * @description Refresh token DTO.
 */
class RefreshToken {
  /**
   * @name token
   * @access private
   * @description The token of the refreshToken object.
   * @type {string}
   */
  @ApiResponseProperty()
  token: string;

  /**
   * @name expiredTime
   * @access private
   * @description The expired time of the refreshToken of the user.
   * @type {string}
   */
  @ApiResponseProperty()
  expiredTime: Date;
}

/**
 * @class
 * @public
 * @name UserAuthLoginRequest
 * @description User login request DTO.
 */
export class UserAuthLoginRequest {
  /**
   * @name email
   * @access public
   * @description The email of the user.
   * @type {string}
   */
  @ApiProperty()
  @IsEmail()
  @Transform((email) => email.value.toLowerCase())
  email: string;

  /**
   * @name password
   * @access public
   * @description The password of the user as plaintext.
   * @type {string}
   */
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

/**
 * @class
 * @public
 * @name UserAuthLoginResponse
 * @description User login response DTO.
 */
export class UserAuthLoginResponse {
  /**
   * @name accessToken
   * @access public
   * @description The generated accessToken of the user.
   * @type {string}
   */
  @ApiResponseProperty()
  accessToken: string;

  /**
   * @name expiredTime
   * @access public
   * @description The expired time of the accessToken of the user.
   * @type {string}
   */
  @ApiResponseProperty()
  expiredTime: Date;

  /**
   * @name refreshToken
   * @access public
   * @description The refreshToken for the user's accessToken.
   * @param {Object} refreshToken
   * @param {string} refreshToken.token The refresh token.
   * @param {string} refreshToken.expiredTime The expiredTime of the refreshToken.
   */
  @ApiResponseProperty()
  refreshToken: RefreshToken;

  /**
   * @name user
   * @access public
   * @description The user respone.
   * @type {UserRespone}
   */
  @ApiResponseProperty()
  user: UserRespone;
}
