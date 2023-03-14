import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTourpackageDto } from './dto/create-tourpackage.dto';
import { UpdateTourpackageDto } from './dto/update-tourpackage.dto';
import { Tourpackage } from './entities/tourpackage.entity';

@Injectable()
export class TourpackageService {
  constructor(@InjectRepository(Tourpackage) private TourpackageRepo:Repository<Tourpackage>){}
 async create(createTourpackageDto: CreateTourpackageDto) {
    const tourpackage = await this.TourpackageRepo.create(createTourpackageDto)
   return await this.TourpackageRepo.save(tourpackage)
  }

  findAll() {
    return this.TourpackageRepo.find();
  }

  findOne(Id: number) {
    return  this.TourpackageRepo.findOne({where:{Id}});
  }

  update(Id: number, updateTourpackageDto: UpdateTourpackageDto) {
    return this.TourpackageRepo.update({Id}, {...updateTourpackageDto });
  }

  remove(Id: number) {
    return  this.TourpackageRepo.delete(Id);
  }
}
