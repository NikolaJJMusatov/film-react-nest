import { Connection } from 'mongoose';
import { FilmSchema } from './films.schema';

export const filmsProvider = {
  provide: 'FILM_DB',
  useFactory: (connection: Connection) => connection.model('Film', FilmSchema),
  inject: ['DB_CONNECT'],
};
