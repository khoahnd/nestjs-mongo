import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { BaseModule } from '@base/base.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from './config/ormconfig';
import { ApiModule } from '@api/api.module';

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    // Add module
    ApiModule,
    BaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
