import { Controller, Get, HttpStatus, Param, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/s3/s3.service';
import { Cheque } from './Entity/cheq.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request, Response } from 'express';
import { Cash } from './Entity/cash.entity';

@Controller('depositrequest')
export class DepositController {
  constructor(
  @InjectRepository(Cheque) private chequeRepository:Repository<Cheque>,
  @InjectRepository(Cash) private CashRepository:Repository<Cash>,
  private readonly depositService: DepositService,
  private s3service: S3Service) {}
  
  @Post('Addchequedeposit')
  @UseInterceptors(
    FileInterceptor('chequeattachmenturl'),
  )
  async AddChequeDeposit(
    @UploadedFile()
    file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response) {
    const chequeattachmenturl = await this.s3service.Addimage(file)
    const cheque = new Cheque();
    cheque.chequeattachmenturl =chequeattachmenturl
    cheque.ChequeNumber =req.body.ChequeNumber
    cheque.BankName =req.body.BankName
    cheque.ChequeDate =req.body.ChequeDate
    cheque.Reference =req.body.Reference
    cheque.Amount=req.body.Amount
    await this.chequeRepository.save(cheque)
    return res.status(HttpStatus.OK).send({ status: "success", message: " Cheque Deposit Request Successfull", })
  }


  
  @Post('Addcashdeposit')
  @UseInterceptors(
    FileInterceptor('cashattachmenturl'),
  )
  async Addcashdeposit(
    @UploadedFile()
    file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response) {
    const cashattachmenturl = await this.s3service.Addimage(file)
    const cash = new Cash();
    cash.cashattachmenturl =cashattachmenturl
    cash.Name = req.body.Name
    cash.ReceiverName = req.body.ReceiverName
    cash.Reference =req.body.Reference
    cash.Amount=req.body.Amount
    await this.CashRepository.save(cash)
    return res.status(HttpStatus.OK).send({ status: "success", message: " Cash Deposit Request Successfull", })
  }

  @Get(':id')
  async getchequedeposit(
    @Param('id') id:string,
    @Req() req: Request,
    @Res() res: Response
    ){
    const chequedeposit= await this.depositService.Findchequedeposit(id)
    return res.status(HttpStatus.OK).json({chequedeposit})
  }


}
