import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserAuthService } from '@api/services';
import { Exception } from '@api/helpers';
import { ApiRequestInterface } from '../interfaces';
import { NextFunction, Response } from 'express';

@Injectable()
export class UserAuthMiddleware implements NestMiddleware {
  constructor(private userAuthService: UserAuthService) {}
  async use(req: ApiRequestInterface, res: Response, next: NextFunction) {
    // validate request
    const user = await this.userAuthService.validateRequest(req);
    if (!user) {
      Exception.unauthorized('unauthorized');
    }
    req.user = user;
    next();
  }
}
