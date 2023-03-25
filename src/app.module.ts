import { ConfigModule } from '@nestjs/config';

import { Userprofile } from './userProfile/entitties/userprofile.entities';
import { Tourpackage } from './tourpackage/entities/tourpackage.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TourpackageModule } from './tourpackage/tourpackage.module';
import { AlbumImage } from './tourpackage/entities/albumimage.entity';
import { packageexcluions } from './tourpackage/entities/packageexclsuions.entity';
import { Packageinclusion } from './tourpackage/entities/packageInclusion.entitry';
import { tourpackageplan } from './tourpackage/entities/tourpackageplan.entity';
import { packagehighlight } from './tourpackage/entities/packagehighlight.entity';
import { bookingpolicy } from './tourpackage/entities/bookingpolicy.entity';
import { VisitedPlace } from './tourpackage/entities/visitedplace.entity';
import { Traveller } from './Traveller/entities/traveller.entity';
import { User } from './Auth/entities/user.entity';
import { UserModule } from './Auth/user.module';
import { TravellerModule } from './Traveller/traveller.module';
import { UsderProfileModule } from './userProfile/userprofile.module';
import { refundpolicy } from './tourpackage/entities/refundpolicy.entity';
import { MainImage } from './tourpackage/entities/mainimage.entity';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'flyfar-ladies',
      entities: [User,
        Tourpackage,
        MainImage,
        AlbumImage,
        packageexcluions,
        Packageinclusion,
        tourpackageplan,
        packagehighlight,
        bookingpolicy,
        VisitedPlace,
        Userprofile,
        Traveller,
        refundpolicy
      ],
      synchronize: true,
    }),
    UserModule,
    TourpackageModule,
    TravellerModule,
    UsderProfileModule,
    S3Module,
    ConfigModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }



// host: 'containers-us-west-99.railway.app',
//   port: 7444,
//     username: 'root',
//       password: 'xUFlxTq7jKQkDw2BINQK',
//         database: 'railway',