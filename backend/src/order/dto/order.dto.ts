import { IsString, IsNumber, IsArray } from 'class-validator';

export class TicketDto {
  @IsString()
  film: string;
  @IsString()
  session: string;
  @IsString()
  daytime: string;
  @IsString()
  day: string;
  @IsString()
  time: string;
  @IsNumber()
  row: number;
  @IsNumber()
  seat: number;
  @IsNumber()
  price: number;
}

export class ContactsBuyerDto {
  @IsString()
  email: string;
  @IsString()
  phone: string;
}

export class CreateOrderDto extends ContactsBuyerDto {
  @IsArray()
  tickets: TicketDto[];
}

export class TicketsPurchasedDto {
  ticket: TicketDto;
  scheduleIndex: number;
  seat: string;
}
