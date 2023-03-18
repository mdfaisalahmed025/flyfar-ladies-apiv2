
import { Userprofile } from './userProfile/entitties/userprofile.entities';
import { Tourpackage } from './tourpackage/entities/tourpackage.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TourpackageModule } from './tourpackage/tourpackage.module';
import { AlbumImage } from './tourpackage/entities/albumimage.entity';
import { packageexcluions } from './tourpackage/entities/packageexclsuions.entity';
import { packageincluded } from './tourpackage/entities/PackageInclude.entity';
import { Packageinclusion } from './tourpackage/entities/packageInclusion.entitry';
import { tourpackageplan } from './tourpackage/entities/tourpackageplan.entity';
import { packagehighlight } from './tourpackage/entities/packagehighlight.entity';
import { refundpolicy } from './tourpackage/entities/refundpolicy.entity';
import { bookingpolicy } from './tourpackage/entities/bookingpolicy.entity';
import { VisitedPalce } from './tourpackage/entities/visitedplace.entity';
import { Traveller } from './Traveller/entities/traveller.entity';
import { User } from './Auth/entities/user.entity';
import { UserModule } from './Auth/user.module';
import { TravellerModule } from './Traveller/traveller.module';
import { UsderProfileModule } from './userProfile/userprofile.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'containers-us-west-92.railway.app',
      port: 6675,
      username: 'root',
      password: 'bat35GnjfyJNyPzIS3l6',
      database: 'railway',
      entities: [User,
        Tourpackage,
        AlbumImage,
        packageexcluions,
        packageincluded,
        Packageinclusion,
        tourpackageplan,
        packagehighlight,
        refundpolicy,
        bookingpolicy,
        VisitedPalce,
        Userprofile,
        Traveller
      ],
      synchronize:true,
    }),
    UserModule,
    TourpackageModule,
   TravellerModule,
   UsderProfileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


// host: 'containers-us-west-92.railway.app',
// port: 6675,
// username: 'root',
// password: 'bat35GnjfyJNyPzIS3l6',
// database: 'railway',


// host: '127.0.0.1',
// port: 3306,
// username: 'root',
// password: '',
// database: 'flyfar-ladies',