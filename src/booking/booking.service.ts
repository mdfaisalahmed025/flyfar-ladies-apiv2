import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tourpackage } from 'src/tourpackage/entities/tourpackage.entity';
import { Traveller } from 'src/Traveller/entities/traveller.entity';
import { Repository } from 'typeorm';
import { Booking } from './entity/booking.entity';

@Injectable()
export class BookingService {
   constructor(@InjectRepository(Tourpackage)
   private tourPackageRepository: Repository<Tourpackage>,
   @InjectRepository(Traveller)
   private travelerRepository:Repository<Traveller>,
   @InjectRepository(Booking)
   private bookingRepository: Repository<Booking>
   ){}

   async BookTravelpackage(Id:number, TravellerId:string){
      const tourPackage = await this.tourPackageRepository.findOne({where:{Id}})
      const travelers = await this.travelerRepository.findOne({where:{TravellerId}});
      if (!tourPackage) {
         throw new NotFoundException('Tour package not found');
       }
       if (!travelers) {
         throw new NotFoundException('Traveler not found');
       }

       const booking = new Booking();
       booking.tourPackage = tourPackage;
       booking.travelers = travelers;
       await this.bookingRepository.save(booking)

   }
}
