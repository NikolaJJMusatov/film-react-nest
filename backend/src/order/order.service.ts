import { Injectable, Inject } from '@nestjs/common';
import { FilmsMongoDbRepository } from '../repository/films.mongo.repository';
import { FilmsPostgresDBRepository } from '../repository/films.postgres.repository';
import {
  CreateOrderDto,
  TicketDto,
  TicketsPurchasedDto,
} from './dto/order.dto';
import { PlaceAlredyReservedException } from '../exceptions/place-alredy-reserved.exception';
import { AppConfig } from '../app.config.provider';

@Injectable()
export class OrderService {
  constructor(
    @Inject('CONFIG') private readonly config: AppConfig,
    private readonly filmsMongoDbRepository: FilmsMongoDbRepository,
    private readonly filmsPostgresDBRepository: FilmsPostgresDBRepository,
  ) {}

  async createOrder(
    order: CreateOrderDto,
  ): Promise<{ items: TicketDto[] | null; total: number }> {
    const tickets = order.tickets;
    //код Postgres
    if (this.config.database.driver === 'postgres') {
      for (const ticket of tickets) {
        const filmFromDb = await this.filmsPostgresDBRepository.findOne(
          ticket.film,
        );
        const schedule = filmFromDb.schedule.find(
          (item) => item.id === ticket.session,
        );
        const seat = `${ticket.row}:${ticket.seat}`;

        if (schedule.taken.split(',').includes(seat)) {
          throw new PlaceAlredyReservedException(JSON.stringify(seat));
        } else {
          !schedule.taken
            ? (schedule.taken = seat)
            : (schedule.taken = schedule.taken + `,${seat}`);
          await this.filmsPostgresDBRepository.updateTakenTicket(filmFromDb);
        }
      }

      //код Mongo
    } else if (this.config.database.driver === 'mongodb') {
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
    }

    return { items: tickets, total: tickets.length };
  }
}
