import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTourpackageDto } from './dto/create-tourpackage.dto';
import { UpdateTourpackageDto } from './dto/update-tourpackage.dto';
import { Tourpackage } from './entities/tourpackage.entity';

@Injectable()
export class TourpackageService {

  constructor(@InjectRepository(Tourpackage) private TourpackageRepo:Repository<Tourpackage>){}

//  async Addpackage(createTourpackageDto: CreateTourpackageDto) {
//   const {
//     PkId,
//     MainTitle,
//     SubTitle,
//     Price,
//     Location,
//     StartDate,
//     EndDate,
//     TripType,
//     Availability,
//     TotalDuration,
//     PackageOverview,
//     Showpackage} = createTourpackageDto;
   
//     const tourpackage = new Tourpackage()
//     tourpackage.MainTitle =MainTitle
  
//     await this.TourpackageRepo.save(tourpackage);
//   }

  findAll() {
    return this.TourpackageRepo.find();
  }

  findOne(Id: number) {
    return  this.TourpackageRepo.findOne({where:{Id}});
  }

  // update(Id: number, updateTourpackageDto: UpdateTourpackageDto) {
  //   return this.TourpackageRepo.update({Id}, {...updateTourpackageDto});
  // }

  remove(Id: number) {
    return  this.TourpackageRepo.delete(Id);
  }
}
