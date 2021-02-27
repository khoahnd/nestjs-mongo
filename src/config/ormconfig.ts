import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import * as path from 'path';

const SRC_DIR = path.resolve(__dirname, '..');
const ROOT_DIR = path.resolve(__dirname, '..', '..');

if (fs.existsSync(`${ROOT_DIR}/.env`)) {
  dotenv.config();
}

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: 'mongodb',
      url: process.env.DATABASE_URL,
      entities: [SRC_DIR + '/entities/*.entity{.ts,.js}'],
      synchronize: false,
      autoLoadEntities: true,
      useUnifiedTopology: true,
      keepConnectionAlive: true,
    };
  }
}
