import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import { configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { FilmsService } from './films/films.service';
import { OrderService } from './order/order.service';
import { FilmsMongoDbRepository } from './repository/films.mongo.repository';
import { FilmsPostgresDBRepository } from './repository/films.postgres.repository';
import { DatabaseModule } from './database/database.module';
import { filmsProvider } from './films/films.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      renderPath: '/content/afisha/',
    }),
    DatabaseModule,
  ],
  controllers: [FilmsController, OrderController],
  providers: [
    configProvider,
    FilmsService,
    OrderService,
    filmsProvider,
    FilmsMongoDbRepository,
    FilmsPostgresDBRepository,
  ],
})
export class AppModule {}
