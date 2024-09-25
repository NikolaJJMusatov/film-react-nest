import { FilmSchema } from './films.schema';
import { Film } from './entities/film.entity';
import { AppConfig } from '../app.config.provider';

export const filmsProvider = {
  provide: 'FILM_DB',
  useFactory: (connection, config: AppConfig) =>
    config.database.driver === 'postgres'
      ? connection.getRepository(Film)
      : connection.model('Film', FilmSchema),
  inject: ['DB_CONNECT', 'CONFIG'],
};
