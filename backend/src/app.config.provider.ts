import { ConfigModule } from '@nestjs/config';

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      driver: process.env.DATABASE_DRIVER,
      url: process.env.DATABASE_URL,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      databasename: process.env.DATABASE_DATABASE,
    },
    mode: process.env.MODE,
    logger: process.env.LOGGER_APP,
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
  mode: string;
  logger: string;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
  host: string;
  port: string;
  username: string;
  password: string;
  databasename: string;
}
