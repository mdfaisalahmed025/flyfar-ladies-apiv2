import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TourpackageService } from './tourpackage.service';
import { TourpackageController } from './tourpackage.controller';
import { Tourpackage } from './entities/tourpackage.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Tourpackage])],
  controllers: [TourpackageController],
  providers: [TourpackageService]
})
export class TourpackageModule {}
