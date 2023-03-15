import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTourpackageDto } from './dto/update-tourpackage.dto';
import { Tourpackage } from './entities/tourpackage.entity';

// tour package services
@Injectable()
export class TourpackageService {

constructor(@InjectRepository(Tourpackage) private TourpackageRepo:Repository<Tourpackage>){}

async findAll() {
    return this.TourpackageRepo.find();
  }
  
async  findOne(Id: number) {
    return  this.TourpackageRepo.findOne({where:{Id}});
  }

async  remove(Id: number) {
    return  this.TourpackageRepo.delete(Id);
  }
}
