import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { UserAuthService } from '@api/services';
import { UserAuthLoginResponse, UserAuthLoginRequest } from '@api/dtos';
import { Controller, Post, Body, HttpStatus } from '@nestjs/common';

/**
 * @description The controllers that will be used for the authencation.
 */
@ApiTags('user')
@Controller('users/authentication')
export class UserAuthenticationController {
  constructor(private readonly _userAuthService: UserAuthService) {}

  /**
   * @method
   * @name login
   * @description Handles login requests of the user.
   * @param {Object} identity
   * @param {string} identity.email      The email of the user.
   * @param {string} identity.password   The password of the user.
   * @return {Promise<UserAuthLoginResponse>}
   */
  @ApiResponse({ status: HttpStatus.OK, type: UserAuthLoginResponse })
  @ApiOperation({ summary: 'Going to do the authentication' })
  @Post('login')
  async login(
    @Body() identity: UserAuthLoginRequest,
  ): Promise<UserAuthLoginResponse> {
    return this._userAuthService.login(identity);
  }
}
