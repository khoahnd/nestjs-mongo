/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Exception } from '@api/helpers';
import { UserRespone } from '@api/dtos';

@Injectable()
export abstract class AuthService {
  async validateRequest(req: Request): Promise<UserRespone> {
    const authorization = req.headers.authorization
      ? req.headers.authorization
      : 'Bearer ';
    const authHeaders = (authorization as string).split(' ');
    if (
      authHeaders.length == 2 &&
      authHeaders[0] == 'Bearer' &&
      authHeaders[1] != ''
    ) {
      return await this.verifyUser(authHeaders[1]);
    } else {
      Exception.unauthorized('auth.unauthorized');
    }
  }

  async verifyUser(token: string): Promise<UserRespone> {
    throw new Error('[AuthService] Must override this method');
  }
}
