import { Repository } from 'typeorm/repository/Repository';
import { Traveller } from 'src/Traveller/entities/traveller.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entity/booking.entity';
import { Tourpackage } from 'src/tourpackage/entities/tourpackage.entity';

@Injectable()
export class BookingService {
   constructor(@InjectRepository(Tourpackage)
   private tourPackageRepository: Repository<Tourpackage>,
   @InjectRepository(Traveller)
   private travelerRepository:Repository<Traveller>,
   @InjectRepository(Booking)
   private bookingRepository: Repository<Booking>){}

   async BookTravelpackage(Id:number, TravellerId:string){
      const tourPackage = await this.tourPackageRepository.findOne({where:{Id}})
      const traveler = await this.travelerRepository.findOne({where:{TravellerId}});
  
      if (!tourPackage) {
        throw new NotFoundException('Tour package not found');
      }
  
      if (!traveler) {
        throw new NotFoundException('Traveler not found');
      }
      
   }
   

}
