import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [],
  exports: [ConfigModule],
})
export class BaseModule {}
