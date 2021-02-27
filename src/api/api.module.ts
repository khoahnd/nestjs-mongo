import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseModule } from '@base/base.module';
import * as entities from '../entities';
import * as services from '@api/services';
import * as controllers from '@api/controllers';
import { UserAuthMiddleware } from './middlewares';

/* ++ Mapping these modules as an array ++ */
const ENTITIES: any[] = Object.keys(entities).map((entity) => entities[entity]);
const CONTROLLERS: any[] = Object.keys(controllers).map(
  (controller) => controllers[controller],
);
const SERVICES: any[] = Object.keys(services).map(
  (service) => services[service],
);
/* ++ Mapping these modules as an array ++ */

@Module({
  imports: [BaseModule, TypeOrmModule.forFeature([...ENTITIES])],
  controllers: [...CONTROLLERS],
  providers: [...SERVICES],
})
export class ApiModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserAuthMiddleware)
      .exclude('api/users/authentication/(.*)', 'api/users/register')
      .forRoutes({
        path: 'users',
        method: RequestMethod.ALL,
      });
  }
}
