import { HttpException, HttpStatus } from '@nestjs/common';

export class PlaceAlredyReservedException extends HttpException {
  constructor(placesIsBusy: string) {
    super(
      `The places ${placesIsBusy} is already reserved`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
