import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        createOrder: jest.fn().mockResolvedValue({
          items: [
            {
              film: 'test film',
              session: '0',
              daytime: '2024-06-28T14:00:53+03:00',
              day: '2024-06-28',
              time: '7:44',
              row: 1,
              seat: 1,
              price: 150,
            },
          ],
          total: 1,
        }),
      })
      .compile();

    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  it('.createOrder() should call OrderService.createOrder()', async () => {
    const order = {
      email: 'test',
      phone: '77-77-77',
      tickets: [
        {
          film: 'test film',
          session: '0',
          daytime: '2024-06-28T14:00:53+03:00',
          day: '2024-06-28',
          time: '7:44',
          row: 1,
          seat: 1,
          price: 150,
        },
      ],
    };

    const orderDone = await orderController.createOrder(order);
    expect(orderDone).toEqual({
      items: order.tickets,
      total: order.tickets.length,
    });
    expect(orderService.createOrder).toHaveBeenCalledWith(order);
  });
});
