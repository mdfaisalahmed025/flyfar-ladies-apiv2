import { Body, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Controller, Get, Param } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Express } from 'express';
import { Request, Response } from 'express';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }


  @Post('addbooking')
  async addbooking(
    @Body('Id') Id: number, 
    @Body('TravellerId') TravellerId: string,
    @Req() req: Request,
    @Res() res: Response) {
    await this.bookingService.BookTravelpackage(Id,TravellerId)
    return res.status(HttpStatus.OK).send({ status: "success", message: "Booking Confirmed" })
  }

  @Get(':Bookingid')
  async getBooking(
    @Param('Bookingid') Bookingid: string,) {
    return await this.bookingService.getBooking(Bookingid)
  }

  @Get('allbooking')
  async getALlBooking() {
    return await this.bookingService.getallbooking()
  }

}
