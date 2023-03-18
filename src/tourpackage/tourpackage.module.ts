import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TourpackageService } from './tourpackage.service';
import { TourpackageController } from './tourpackage.controller';
import { Tourpackage } from './entities/tourpackage.entity';
import { AlbumImage } from './entities/albumimage.entity';
import { VisitedPlace } from './entities/visitedplace.entity';
import { packageincluded } from './entities/PackageInclude.entity';
import { Packageinclusion } from './entities/packageInclusion.entitry';
import { tourpackageplan } from './entities/tourpackageplan.entity';
import { packageexcluions } from './entities/packageexclsuions.entity';
import { packagehighlight } from './entities/packagehighlight.entity';
import { bookingpolicy } from './entities/bookingpolicy.entity';
import { refundpolicy } from './entities/refundpolicy.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    Tourpackage,
    AlbumImage,
    VisitedPlace,
    packageincluded,
    Packageinclusion,
    tourpackageplan,
    packageexcluions,
    packagehighlight,
    bookingpolicy,
    refundpolicy,
    Tourpackage
  ])],
  controllers: [TourpackageController],
  providers: [TourpackageService]
})
export class TourpackageModule {}
