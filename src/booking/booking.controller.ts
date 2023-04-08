import { Body, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Controller, Get, Param } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Express } from 'express';
import { Request, Response } from 'express';
import { CreateBookingDto } from './dto/booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Post('addbooking')
  async addbooking(

    @Body() bookingDto: CreateBookingDto, TravellerId: string,
    @Req() req: Request,
    @Res() res: Response) {

    const booking = await this.bookingService.BookTravelpackage(bookingDto, TravellerId)
    return res.status(HttpStatus.OK).send({ status: "success", message: "Booking Confirmed", booking })
  }
  @Get(':Bookingid')
  async getBooking(
    @Param('Bookingid') Bookingid: string,) {
    return await this.bookingService.getBooking(Bookingid)
  }

  @Get('getall/booking')
  async getALlBooking(@Res() res: Response) {
    const bookings = await this.bookingService.FindAll()
    return res.status(HttpStatus.OK).json({ bookings });

  }

}
