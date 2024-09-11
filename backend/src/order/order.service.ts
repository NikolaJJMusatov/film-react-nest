import { Injectable } from '@nestjs/common';
import { FilmsMongoDbRepository } from '../repository/films.repository';
import {
  CreateOrderDto,
  TicketDto,
  TicketsPurchasedDto,
} from './dto/order.dto';
import { PlaceAlredyReservedException } from '../exceptions/place-alredy-reserved.exception';

@Injectable()
export class OrderService {
  constructor(
    private readonly filmsMongoDbRepository: FilmsMongoDbRepository,
  ) {}

  async createOrder(
    order: CreateOrderDto,
  ): Promise<{ items: TicketDto[] | null; total: number }> {
    const tickets = order.tickets;
    const ticketsPurchased: TicketsPurchasedDto[] = [];
    const placesIsBusy: TicketDto[] = [];

    for (const ticket of tickets) {
      const filmFromDb = await this.filmsMongoDbRepository.findById(
        ticket.film,
      );
      const scheduleIndex: number = filmFromDb.items.findIndex(
        (item) => item.id === ticket.session,
      );
      const seat = `${ticket.row}:${ticket.seat}`;

      if (filmFromDb.items[scheduleIndex].taken.includes(seat)) {
        placesIsBusy.push(ticket);
      }

      ticketsPurchased.push({
        ticket: ticket,
        scheduleIndex: scheduleIndex,
        seat: seat,
      });
    }

    if (placesIsBusy.length !== 0) {
      throw new PlaceAlredyReservedException(JSON.stringify(placesIsBusy));
    } else {
      for (const ticketPurchased of ticketsPurchased) {
        await this.filmsMongoDbRepository.updateTakenTicket(
          ticketPurchased.seat,
          ticketPurchased.scheduleIndex,
          ticketPurchased.ticket,
        );
      }
    }

    return { items: tickets, total: tickets.length };
  }
}
