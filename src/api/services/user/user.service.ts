import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@entities/user.entity';
import { Not, Repository } from 'typeorm';
import { CreateUserRequest, UserRespone } from '@api/dtos';
import { classToPlain } from 'class-transformer';
import { Exception } from '@api/helpers';
import { userError } from '@api/common';
import { UserStatusEnum } from '~/api/enums';

/**
 * @class
 * @public
 * @name UserService
 * @description The user service.
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {}

  /**
   * @method
   * @name create
   * @description Create a user.
   * @param {CreateUserRequest} payload
   * @return {UserRespone}
   */
  async create(payload: CreateUserRequest): Promise<UserRespone> {
    const entityUser = await this.userEntity.create(payload);
    const user = await this.userEntity.save(entityUser);
    return <UserRespone>classToPlain(user);
  }

  /**
   * @method
   * @name findById
   * @description Find a user by id.
   * @param {String} id
   * @return {UserRespone}
   */
  async findById(_id: String): Promise<UserRespone> {
    const user = await this.userEntity.findOne({
      where: { _id, status: Not(UserStatusEnum.DELETED) },
    });
    if (!user) Exception.badRequest(userError.ERR_USER_NOT_FOUND);
    if (user.status === UserStatusEnum.INACTIVE)
      Exception.badRequest(userError.USER_ALREADY_DISABLED);
    return <UserRespone>classToPlain(user);
  }
}
