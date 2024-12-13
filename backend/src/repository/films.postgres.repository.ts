import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { Film } from '../films/entities/film.entity';
import { Schedule } from '../films/entities/schedule.entity';
import { FilmNotFoundException } from '../exceptions/film-notfound.exception';
import { ServerErrorException } from '../exceptions/server-error.exception';

export class FilmsPostgresDBRepository {
  constructor(
    @Inject('FILM_DB')
    private filmRepository: Repository<Film>,
  ) {}

  async findAll(): Promise<{ total: number; items: Film[] }> {
    const [items, total] = await Promise.all([
      this.filmRepository.find({ relations: { schedule: true } }),
      this.filmRepository.count(),
    ]);

    return { total, items };
  }

  async findById(id: string): Promise<{ total: number; items: Schedule[] }> {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: { schedule: true },
      order: { schedule: { daytime: "ASC"  } }, 
    });
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

  async findOne(id: string): Promise<Film> {
    try {
      return await this.filmRepository.findOne({
        where: { id },
        relations: { schedule: true },
      });
    } catch (error) {
      throw new FilmNotFoundException(id);
    }
  }

  async updateTakenTicket(film: Film): Promise<string> {
    try {
      await this.filmRepository.save(film);
      return `Update ${film.id} in DB`;
    } catch (error) {
      new ServerErrorException(error.message);
    }
  }
}
