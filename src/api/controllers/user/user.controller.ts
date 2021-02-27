import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserRequest, UserRespone } from '@api/dtos';
import { UserService } from '@api/services';

/**
 * @class
 * @public
 * @name UserController
 * @description The user controllers.
 */
@ApiBearerAuth('bearer')
@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * @method
   * @name create
   * @description Handles create user requests.
   * @param {CreateUserRequest} identity
   * @return {Promise<UserRespone>}
   */
  @ApiResponse({ status: HttpStatus.CREATED, type: UserRespone })
  @ApiOperation({ summary: 'Going to do create the user' })
  @Post('register')
  async create(@Body() identity: CreateUserRequest): Promise<UserRespone> {
    return this.userService.create(identity);
  }
}
