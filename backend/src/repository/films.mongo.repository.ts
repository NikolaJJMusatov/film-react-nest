import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Film, FilmDocument } from '../films/films.schema';
import { GetFilmDto, GetScheduleDto } from '../films/dto/films.dto';
import { TicketDto } from '../order/dto/order.dto';
import { FilmNotFoundException } from '../exceptions/film-notfound.exception';
import { ServerErrorException } from '../exceptions/server-error.exception';

export class FilmsMongoDbRepository {
  constructor(
    @Inject('FILM_DB')
    private filmModel: Model<FilmDocument>,
  ) {}

  private getFilmMapperFn(): (filmFromDB: Film) => GetFilmDto {
    return (root) => {
      return {
        id: root.id,
        rating: root.rating,
        director: root.director,
        tags: root.tags,
        title: root.title,
        about: root.about,
        description: root.description,
        image: root.image,
        cover: root.cover,
        schedule: root.schedule,
      };
    };
  }

  async findAll(): Promise<{ total: number; items: GetFilmDto[] }> {
    const films = await this.filmModel.find({});
    const total = await this.filmModel.countDocuments({});
    return {
      total,
      items: films.map(this.getFilmMapperFn()),
    };
  }

  async findById(
    id: string,
  ): Promise<{ total: number; items: GetScheduleDto[] | null }> {
    const film = await this.filmModel.findOne({ id });
    let total = 0;
    if (!film) {
      throw new FilmNotFoundException(id);
    } else if (film) {
      total = film.schedule.length;
    }
    return {
      total: total,
      items: film.schedule,
    };
  }

  async updateTakenTicket(
    seat: string,
    scheduleIndex: number,
    ticket: TicketDto,
  ): Promise<string> {
    const FilmSheduleTaken = `schedule.${scheduleIndex.toString()}.taken`;
    try {
      await this.filmModel.updateOne(
        { id: ticket.film },
        { $push: { [FilmSheduleTaken]: seat } },
      );
      return `Update ${FilmSheduleTaken} in DB`;
    } catch (error) {
      new ServerErrorException(error.message);
    }
  }
}
