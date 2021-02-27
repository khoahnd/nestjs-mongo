import { UserRespone } from '../dtos';
import { Request } from 'express';

export interface ApiRequestInterface extends Request {
  user: UserRespone;
}
