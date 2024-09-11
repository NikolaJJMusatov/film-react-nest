import { HttpException, HttpStatus } from '@nestjs/common';

export class FilmNotFoundException extends HttpException {
  constructor(id: string) {
    super(
      `The film with id: ${id} is not in the database`,
      HttpStatus.NOT_FOUND,
    );
  }
}
