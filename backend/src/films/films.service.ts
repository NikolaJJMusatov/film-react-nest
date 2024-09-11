import { Injectable } from '@nestjs/common';
import { FilmsMongoDbRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(
    private readonly filmsMongoDbRepository: FilmsMongoDbRepository,
  ) {}

  async findAll() {
    return this.filmsMongoDbRepository.findAll();
  }

  async findById(id: string) {
    return this.filmsMongoDbRepository.findById(id);
  }
}
