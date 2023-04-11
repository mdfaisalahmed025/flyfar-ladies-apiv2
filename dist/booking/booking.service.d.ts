import { S3Service } from './../s3/s3.service';
import { Tourpackage } from 'src/tourpackage/entities/tourpackage.entity';
import { Traveller } from 'src/Traveller/entities/traveller.entity';
import { Repository } from 'typeorm';
import { Booking } from './entity/booking.entity';
import { CreateBookingDto } from './dto/booking.dto';
export declare class BookingService {
    private tourPackageRepository;
    private travelerRepository;
    private bookingRepository;
    private s3service;
    constructor(tourPackageRepository: Repository<Tourpackage>, travelerRepository: Repository<Traveller>, bookingRepository: Repository<Booking>, s3service: S3Service);
    BookTravelpackage(Id: number, bookingDto: CreateBookingDto): Promise<Booking>;
    getBooking(Bookingid: string): Promise<Booking[]>;
    FindAll(): Promise<Booking[]>;
}
