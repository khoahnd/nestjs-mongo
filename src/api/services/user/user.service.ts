import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@entities/user.entity';
import { Like, Repository } from 'typeorm';
import {
  CreateUserRequest,
  GetListUserRespone,
  UpdateUserRequest,
  UserRespone,
} from '@api/dtos';
import { classToPlain } from 'class-transformer';
import { Exception } from '@api/helpers';
import { userError } from '@api/common';
import { UserStatusEnum } from '~/api/enums';
import { IPaginationOptions } from '@api/interfaces';

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
   * @return {Promise<UserRespone>}
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
   * @return {Promise<UserRespone>}
   */
  async findById(_id: string): Promise<UserRespone> {
    const user = await this.userEntity.findOne({
      where: { _id },
    });
    if (!user || user.status === UserStatusEnum.DELETED)
      Exception.badRequest(userError.ERR_USER_NOT_FOUND);
    if (user.status === UserStatusEnum.INACTIVE)
      Exception.badRequest(userError.USER_ALREADY_DISABLED);
    return <UserRespone>classToPlain(user);
  }

  /**
   * @method
   * @name getList
   * @description Get a list of users.
   * @param {IPaginationOptions} options
   * @param {String} keyword
   * @return {GetListUserRespone}
   */
  async getList(
    options: IPaginationOptions,
    keyword: string,
  ): Promise<GetListUserRespone> {
    let where = {};
    if (keyword) {
      keyword = keyword.trim();
      where = {
        $or: [
          { text: Like(`%${keyword.toString()}%`) },
          { title: Like(`%${keyword.toString()}%`) },
        ],
      };
    }
    const page = +options.page || 1;
    const take = +options.limit || 10;
    const skip = (Math.max(1, page) - 1) * Math.max(take, 0);
    const totalItems = await this.userEntity.count(where);
    const respone = await this.userEntity.find({
      skip,
      take,
      where,
      order: {
        createdAt: 'ASC',
      },
    });
    const totalPages = Math.ceil(totalItems / take);
    return {
      users: <UserRespone[]>classToPlain(respone),
      metadata: {
        page: page,
        limit: take,
        totalItems,
        totalPages,
      },
    };
  }

  /**
   * @method
   * @name findById
   * @description Update a user by id.
   * @param {String} id
   * @param {UpdateUserRequest} payload
   * @return {Promise<UserRespone>}
   */
  async updateById(
    _id: string,
    payload: UpdateUserRequest,
  ): Promise<UserRespone> {
    const existingUser = await this.findById(_id);
    const data = Object.assign({}, existingUser, payload);
    await this.userEntity.update({ _id }, data);
    const user = await this.findById(_id);
    return <UserRespone>classToPlain(user);
  }

  /**
   * @method
   * @name findById
   * @description Delete a user by id.
   * @param {String} id
   * @void
   */
  async deleteUserById(_id: string): Promise<void> {
    const existingUser = await this.findById(_id);
    await this.userEntity.delete({ _id: existingUser._id });
  }
}
