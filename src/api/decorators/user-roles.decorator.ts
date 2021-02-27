import { SetMetadata } from '@nestjs/common';

import { UserRoleEnum } from '@api/enums';

export const UserRoles = (...roles: UserRoleEnum[]) =>
  SetMetadata('roles', roles);
