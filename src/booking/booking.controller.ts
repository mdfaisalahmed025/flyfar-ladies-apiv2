import { Post } from '@nestjs/common';
import { Controller, Get, Param } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}
  
  @Get(':Id/traveller/:travelerId')
  async createBooking(
    @Param('Id') Id: number,
    @Param('travelerId') travelerId: string){
     return await this.bookingService.BookTravelpackage(Id,travelerId)
    }

    @Post('addbooking')
    async addbooking(){
      await this.bookingService.BookTravelpackage()
    }
}
