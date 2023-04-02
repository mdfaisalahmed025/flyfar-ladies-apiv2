import { Module } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { DepositController } from './deposit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cheque } from './Entity/cheq.entity';
import { S3Module } from 'src/s3/s3.module';
import { Cash } from './Entity/cash.entity';

@Module({
  imports:[S3Module,TypeOrmModule.forFeature([Cheque,Cash])],
  controllers: [DepositController],
  providers: [DepositService]
})
export class DepositModule {}
