import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cheque } from './Entity/cheq.entity';
import { Repository } from 'typeorm';
import { Cash } from './Entity/cash.entity';
import { BankTransfer } from './Entity/BankTransfer.entity';

@Injectable()
export class DepositService {
   constructor(
      @InjectRepository(Cheque) private chequeRepository:Repository<Cheque>,
      @InjectRepository(Cash) private CashRepository:Repository<Cash>,
      @InjectRepository(BankTransfer) private BankTransferRepository:Repository<BankTransfer>){}

   async Findchequedeposit(id:string){
      const cheque= await this.chequeRepository.findOne({where:{id}})
      if (!cheque) {
         throw new HttpException(
           `No deposit found with this =${id}`,
           HttpStatus.BAD_REQUEST,
         );
       }
       return cheque;
   }


   async FindAllchequedeposit(){
      const cheque= await this.chequeRepository.find({})
      return cheque;
   }

   async FindCashdeposit(id:string){
      const cash= await this.CashRepository.findOne({where:{id}})
      if (!cash) {
         throw new HttpException(
           `No Cash deposit found with this =${id}`,
           HttpStatus.BAD_REQUEST,
         );
       }
       return cash;
   }

   async FindAllCashdeposit(){
      const cash= await this.CashRepository.find({})
       return cash;
   }
   
   async Findbankdeposit(id:string){
      const bank= await this.BankTransferRepository.findOne({where:{id}})
      if (!bank) {
         throw new HttpException(
           `No bank deposit found with this =${id}`,
           HttpStatus.BAD_REQUEST,
         );
       }
       return bank;
   }


   async FindAllbankdeposit(){
      const bank= await this.BankTransferRepository.find({})
      return bank;
   }

}
