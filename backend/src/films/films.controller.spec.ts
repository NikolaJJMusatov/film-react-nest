import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('FilmsController', () => {
  let filmsController: FilmsController;
  let filmsService: FilmsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        findAll: jest
          .fn()
          .mockResolvedValue([{ id: 'test id1' }, { id: 'test id2' }]),
        findById: jest.fn().mockResolvedValue({ id: 'test id' }),
      })
      .compile();

    filmsController = app.get<FilmsController>(FilmsController);
    filmsService = app.get<FilmsService>(FilmsService);
  });

  it('.getFilms() should call FilmsService.findAll()', async () => {
    const films = await filmsController.getFilms();
    expect(films).toEqual([{ id: 'test id1' }, { id: 'test id2' }]);
    expect(filmsService.findAll).toHaveBeenCalled();
  });

  it('.getFilmShedule() should call FilmsService.findById()', async () => {
    const id = 'test id';
    const filmSchedule = await filmsController.getFilmShedule(id);
    expect(filmSchedule).toEqual({ id: 'test id' });
    expect(filmsService.findById).toHaveBeenCalledWith(id);
  });
});
