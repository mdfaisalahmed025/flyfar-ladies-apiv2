import { Tourpackage } from './tourpackage/entities/tourpackage.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { TourpackageModule } from './tourpackage/tourpackage.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'containers-us-west-92.railway.app',
      port: 6675,
      username: 'root',
      password: 'bat35GnjfyJNyPzIS3l6',
      database: 'railway',
      entities: [User, Tourpackage],
      synchronize: true,
    }),
    UsersModule,
    TourpackageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
