import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cheque } from './Entity/cheq.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepositService {
   constructor(@InjectRepository(Cheque) private chequeRepository:Repository<Cheque>){}

   async Findchequedeposit(id:string){
      await this.chequeRepository.findOne({where:{id}})
   }
}
