import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { FilmsPostgresDBRepository } from '../repository/films.postgres.repository';
import { FilmsMongoDbRepository } from '../repository/films.mongo.repository';

describe('FilmsService', () => {
  let filmsService: FilmsService;
  const filmsPostgresDBRepositoryMock = {
    findAll: jest
      .fn()
      .mockResolvedValue([{ id: 'test id1' }, { id: 'test id2' }]),
    findById: jest.fn().mockResolvedValue({ id: 'test id' }),
  };

  const filmsMongoDbRepositoryMock = {
    findAll: jest.fn(),
    findById: jest.fn(),
  };

  const config = {
    database: {
      driver: 'postgres',
    },
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: 'CONFIG',
          useValue: config,
        },
        {
          provide: FilmsPostgresDBRepository,
          useValue: filmsPostgresDBRepositoryMock,
        },
        {
          provide: FilmsMongoDbRepository,
          useValue: filmsMongoDbRepositoryMock,
        },
      ],
    }).compile();

    filmsService = app.get<FilmsService>(FilmsService);
  });

  it('.findAll() should call filmsPostgresDBRepository.findAll()', async () => {
    const films = await filmsService.findAll();
    expect(films).toEqual([{ id: 'test id1' }, { id: 'test id2' }]);
    expect(filmsPostgresDBRepositoryMock.findAll).toHaveBeenCalled();
  });

  it('.findById() should call filmsPostgresDBRepository.findById()', async () => {
    const id = 'test id';
    const filmSchedule = await filmsService.findById(id);
    expect(filmSchedule).toEqual({ id: 'test id' });
    expect(filmsPostgresDBRepositoryMock.findById).toHaveBeenCalledWith(id);
  });
});
