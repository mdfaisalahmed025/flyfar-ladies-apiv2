import { Body, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Controller, Get, Param } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Express } from 'express';
import { Request, Response } from 'express';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}
  @Post('addbooking')
  async addbooking(
    @Body() 
    body: { Id: number, TravellerId: string[] },
    @Req() req: Request,
    @Res() res: Response) {
    const { Id, TravellerId } = body;
    await this.bookingService.BookTravelpackage(Id,TravellerId)
    return res.status(HttpStatus.OK).send({ status: "success", message: "Booking Confirmed" })
  }
  @Get(':Bookingid')
  async getBooking(
    @Param('Bookingid') Bookingid: string,) {
    return await this.bookingService.getBooking(Bookingid)
  }

  @Get('getall/booking')
  async getALlBooking(@Res() res: Response) {
    const bookings= await this.bookingService.FindAll()
    return res.status(HttpStatus.OK).json({ bookings });
    
  }

}
