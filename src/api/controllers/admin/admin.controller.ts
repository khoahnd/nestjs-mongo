import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRoles } from '@api/decorators';
import { UserRolesGuard } from '@api/guards';
import { UserRoleEnum } from '~/api/enums';

/**
 * @class
 * @public
 * @name AdminController
 * @description The admin controllers.
 */
@ApiBearerAuth('bearer')
@ApiTags('Admin')
@Controller('admin')
@UseGuards(UserRolesGuard)
export class AdminController {
  @Get('test')
  @UserRoles(UserRoleEnum.ADMIN)
  findAll(): string {
    return 'This action of admin';
  }
}
