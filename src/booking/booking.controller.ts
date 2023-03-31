import { Body, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Controller, Get, Param } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Express } from 'express';
import { Request, Response } from 'express';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Get(':Bookingid')
  async getBooking(
    @Param('Bookingid') Bookingid: string,) {
    return await this.bookingService.getBooking(Bookingid)
  }

  @Post(':id/addbooking')
  async addbooking(Id: number, TravellerId: string,
    @Body() body,
    @Req() req: Request,
    @Res() res: Response) {
    await this.bookingService.BookTravelpackage(Id, TravellerId)
    return res.status(HttpStatus.OK).send({ status: "success", message: "Booking Confirmed" })
  }
}
