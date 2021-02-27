import { Exclude, Expose } from 'class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ObjectIdColumn,
} from 'typeorm';
import { GenderTypeEnum, UserRoleEnum, UserStatusEnum } from '@api/enums';
import { BaseModel } from './base.entity';
import { Encrypt } from '@api/helpers';
import { v4 } from 'uuid';

@Entity({
  name: 'user',
  orderBy: {
    createdAt: 'ASC',
  },
})
export class UserEntity extends BaseModel {
  constructor() {
    super();
  }

  @Expose()
  @ObjectIdColumn({
    type: 'string',
  })
  _id: string;

  @Column({
    type: 'varchar',
    length: 360,
  })
  @Expose()
  name: string;

  @Column({
    type: 'varchar',
    length: 360,
    unique: true,
  })
  @Expose()
  email: string;

  @Exclude()
  @Column({
    type: 'varchar',
    length: 60,
    nullable: true,
  })
  password: string;

  @Column({
    type: 'simple-array',
    array: true,
  })
  @Expose()
  roles: UserRoleEnum[] = [UserRoleEnum.USER];

  @Column({
    type: 'enum',
    enum: UserStatusEnum,
  })
  @Expose()
  status: UserStatusEnum = UserStatusEnum.ACTIVE;

  @Expose()
  @Column({
    type: 'enum',
    enum: GenderTypeEnum,
    nullable: false,
  })
  gender: GenderTypeEnum;

  /**
   * @event BeforeInsert
   * @description Triggered when a new instance is created.
   * @function
   * @name beforeInsertUser
   */
  @BeforeInsert()
  beforeInsertUser(): void {
    this._id = this._id || v4();
    if (!!this.password) {
      const { hash } = Encrypt;
      this.password = hash(this.password);
    }
  }

  /**
   * @event BeforeUpdate
   * @description Triggered when a new instance is updated.
   * @function
   * @name hashPasswordWhenUpdate
   */
  @BeforeUpdate()
  beforeUpdateUser(): void {
    if (!!this.password) {
      const { hash } = Encrypt;
      this.password = hash(this.password);
    }
  }
}
