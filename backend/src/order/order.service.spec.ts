import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { FilmsPostgresDBRepository } from '../repository/films.postgres.repository';
import { FilmsMongoDbRepository } from '../repository/films.mongo.repository';
import { PlaceAlredyReservedException } from '../exceptions/place-alredy-reserved.exception';

describe('OrderService', () => {
  let orderService: OrderService;
  const filmsPostgresDBRepositoryMock = {
    findOne: jest.fn().mockResolvedValue({
      id: 'test film id',
      schedule: [
        {
          id: 'test schedule id',
          taken: '',
        },
      ],
    }),
    updateTakenTicket: jest.fn(),
  };

  const filmsMongoDbRepositoryMock = {
    findById: jest.fn(),
    updateTakenTicket: jest.fn(),
  };

  const config = {
    database: {
      driver: 'postgres',
    },
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
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

    orderService = app.get<OrderService>(OrderService);
  });

  it('.createOrder() should call filmsPostgresDBRepository.updateTakenTicket() and create order', async () => {
    const order = {
      email: 'test',
      phone: '77-77-77',
      tickets: [
        {
          film: 'test film id',
          session: 'test schedule id',
          daytime: '2024-06-28T14:00:53+03:00',
          day: '2024-06-28',
          time: '7:44',
          row: 2,
          seat: 1,
          price: 150,
        },
      ],
    };

    const takenTicket = {
      id: 'test film id',
      schedule: [
        {
          id: 'test schedule id',
          taken: '2:1',
        },
      ],
    };

    const orderDone = await orderService.createOrder(order);
    expect(orderDone).toEqual({
      items: order.tickets,
      total: order.tickets.length,
    });
    expect(filmsPostgresDBRepositoryMock.findOne).toHaveBeenCalledWith(
      order.tickets[0].film,
    );
    expect(
      filmsPostgresDBRepositoryMock.updateTakenTicket,
    ).toHaveBeenCalledWith(takenTicket);
  });

  it('.createOrder() should throw PlaceAlredyReservedException if place was reserve', async () => {
    const order = {
      email: 'test',
      phone: '77-77-77',
      tickets: [
        {
          film: 'test film id',
          session: 'test schedule id',
          daytime: '2024-06-28T14:00:53+03:00',
          day: '2024-06-28',
          time: '7:44',
          row: 2,
          seat: 1,
          price: 150,
        },
      ],
    };

    filmsPostgresDBRepositoryMock.findOne.mockResolvedValue({
      id: 'test film id',
      schedule: [
        {
          id: 'test schedule id',
          taken: '2:1',
        },
      ],
    });
    await expect(orderService.createOrder(order)).rejects.toThrow(
      PlaceAlredyReservedException,
    );
  });
});
