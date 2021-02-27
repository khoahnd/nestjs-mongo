import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateUserRequest,
  GetListUserRespone,
  UpdateUserRequest,
  UserRespone,
} from '@api/dtos';
import { UserService } from '@api/services';
import { ApiRequestInterface } from '@api/interfaces';

/**
 * @class
 * @public
 * @name UserController
 * @description The user controllers.
 */
@ApiBearerAuth('bearer')
@ApiTags('User')
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

  /**
   * @method
   * @name getUserProfile
   * @description Handles get profile of the user.
   * @param {ApiRequestInterface} req
   * @return {Promise<UserRespone>}
   */
  @ApiResponse({ status: HttpStatus.OK, type: UserRespone })
  @ApiOperation({ summary: 'Going to do get profile of the user' })
  @Get('me')
  async getUserProfile(@Req() req: ApiRequestInterface): Promise<UserRespone> {
    return this.userService.findById(req.user._id);
  }

  /**
   * @method
   * @name update
   * @description Handles update the user.
   * @param {string} id
   * @param {UpdateUserRequest} payload
   * @return {Promise<UserRespone>}
   */
  @ApiResponse({ status: HttpStatus.OK, type: UserRespone })
  @ApiOperation({ summary: 'Going to do update user' })
  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateUserRequest,
  ): Promise<UserRespone> {
    return this.userService.updateById(id, payload);
  }

  /**
   * @method
   * @name getUserProfile
   * @description Handles delete the user.
   * @param {string} id
   */
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiOperation({ summary: 'Going to do delete user' })
  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.userService.deleteUserById(id);
  }

  /**
   * @method
   * @name getUserProfile
   * @description Handles get a list of the user.
   * @param {ApiRequestInterface} req
   * @return {Promise<GetListUserRespone>}
   */
  @Get('/list')
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetListUserRespone,
  })
  @ApiOperation({ summary: 'Going to do get a list of the user' })
  @ApiQuery({ name: 'keyword', required: false, type: 'string' })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  async getList(
    @Query('page') page = 1,
    @Query('limit') limit = 5,
    @Query('keyword') keyword = '',
  ): Promise<GetListUserRespone> {
    limit = limit > 100 ? 100 : limit;
    return this.userService.getList(
      {
        page,
        limit,
      },
      keyword,
    );
  }
}
