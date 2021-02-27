import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { GenderTypeEnum, UserRoleEnum } from '@api/enums';
import { ObjectIdColumn } from 'typeorm';

/**
 * @class
 * @public
 * @name UserRespone
 * @description User respone DTO.
 */
export class UserRespone {
  /**
   * @name _id
   * @access public
   * @description The _id of the user.
   * @type {string}
   */
  @ApiProperty()
  @ObjectIdColumn({
    type: 'string',
  })
  _id: string;

  /**
   * @name name
   * @access public
   * @description The name of the user.
   * @type {string}
   */
  @ApiProperty()
  name: string;

  /**
   * @name email
   * @access public
   * @description The email of the user.
   * @type {string}
   */
  @ApiProperty()
  email: string;

  /**
   * @name roles
   * @access public
   * @description The roles of the user.
   * @type {Array}
   */
  @ApiProperty({ enum: UserRoleEnum, isArray: true })
  roles: Array<UserRoleEnum>;

  /**
   * @name gender
   * @access public
   * @description The gender of the user.
   * @type {string}
   */
  @ApiProperty({ enum: GenderTypeEnum })
  gender: GenderTypeEnum;

  /**
   * @name createdAt
   * @access public
   * @description The createdAt of the user.
   * @type {string}
   */
  @ApiProperty()
  createdAt: number;

  /**
   * @name updatedAt
   * @access public
   * @description The updatedAt of the user.
   * @type {string}
   */
  @ApiProperty()
  updatedAt: number;
}

/**
 * @class
 * @public
 * @name CreateUserRequest
 * @description Create user request DTO.
 */
export class CreateUserRequest {
  /**
   * @name name
   * @access public
   * @description The name of the user.
   * @type {string}
   */
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'required' })
  name: string;

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
   * @description The password of the user.
   * @type {string}
   */
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'required' })
  @Transform((password) => password.value.trim())
  password: string;

  /**
   * @name gender
   * @access public
   * @description The gender of the user.
   * @type {string}
   */
  @ApiProperty({ enum: GenderTypeEnum })
  @IsNotEmpty({ message: 'required' })
  @IsEnum(GenderTypeEnum)
  gender: GenderTypeEnum;
}

/**
 * @class
 * @public
 * @name UpdateEndUserRequest
 * @description Update user request DTO.
 */
export class UpdateEndUserRequest {
  /**
   * @name name
   * @access public
   * @description The name of the user.
   * @type {string}
   */
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'required' })
  name: string;

  /**
   * @name gender
   * @access public
   * @description The gender of the user.
   * @type {string}
   */
  @ApiProperty({ enum: GenderTypeEnum })
  @IsNotEmpty({ message: 'required' })
  @IsEnum(GenderTypeEnum)
  @IsOptional()
  gender: GenderTypeEnum;
}
