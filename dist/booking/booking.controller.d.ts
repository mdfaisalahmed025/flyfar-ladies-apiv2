import { BookingService } from './booking.service';
import { Request, Response } from 'express';
import { CreateBookingDto } from './dto/booking.dto';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    addbooking(bookingDto: CreateBookingDto, Id: number, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getBooking(Bookingid: string): Promise<import("./entity/booking.entity").Booking[]>;
    getALlBooking(res: Response): Promise<Response<any, Record<string, any>>>;
}
