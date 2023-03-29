import { Param } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { async } from 'rxjs';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get(':Id/gettravller/:travelerId')
  async createBooking(
    @Param('Id') Id: number,
    @Param('travelerId') travelerId: string,){
      await this.bookingService.BookTravelpackage(Id,travelerId)
    }
}
