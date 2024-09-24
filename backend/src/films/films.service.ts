import { Injectable, Inject } from '@nestjs/common';
import { AppConfig } from '../app.config.provider';
import { FilmsMongoDbRepository } from '../repository/films.mongo.repository';
import { FilmsPostgresDBRepository } from '../repository/films.postgres.repository';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('CONFIG') private readonly config: AppConfig,
    private readonly filmsMongoDbRepository: FilmsMongoDbRepository,
    private readonly filmsPostgresDBRepository: FilmsPostgresDBRepository,
  ) {}

  async findAll() {
    if (this.config.database.driver === 'postgres') {
      return this.filmsPostgresDBRepository.findAll();
    } else if (this.config.database.driver === 'mongodb') {
      return this.filmsMongoDbRepository.findAll();
    }
  }

  async findById(id: string) {
    if (this.config.database.driver === 'postgres') {
      return this.filmsPostgresDBRepository.findById(id);
    } else if (this.config.database.driver === 'mongodb') {
      return this.filmsMongoDbRepository.findById(id);
    }
  }
}
