import { Controller, Get, HttpStatus, Param, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/s3/s3.service';
import { Cheque } from './Entity/cheq.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request, Response } from 'express';
import { Cash } from './Entity/cash.entity';
import { BankTransfer } from './Entity/BankTransfer.entity';

@Controller('depositrequest')
export class DepositController {
  constructor(
  @InjectRepository(Cheque) private chequeRepository:Repository<Cheque>,
  @InjectRepository(Cash) private CashRepository:Repository<Cash>,
  @InjectRepository(BankTransfer) private BankTransferRepository:Repository<BankTransfer>,
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


  @Get('getchequedeposit/:id')
  async getchequedeposit(
    @Param('id') id:string,
    @Req() req: Request,
    @Res() res: Response
    ){
    const chequedeposit= await this.depositService.Findchequedeposit(id)
    return res.status(HttpStatus.OK).json({chequedeposit})
  }

  @Get('allchequedeposit')
  async getAllchequedeposit(
    @Req() req: Request,
    @Res() res: Response
    ){
    const Allchequedeposit= await this.depositService.FindAllchequedeposit()
    return res.status(HttpStatus.OK).json({Allchequedeposit})
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

  
  @Get('getcashdeposit/:id')
  async getcashdeposit(
    @Param('id') id:string,
    @Req() req: Request,
    @Res() res: Response
    ){
    const cashdeposit= await this.depositService.FindCashdeposit(id)
    return res.status(HttpStatus.OK).json({cashdeposit})
  }

  @Get('allcashdeposit')
  async getAllCashdeposit(
    @Req() req: Request,
    @Res() res: Response
    ){
    const Allcashdeposit= await this.depositService.FindAllCashdeposit()
    return res.status(HttpStatus.OK).json({Allcashdeposit})
  }

// Bank Transfer
  @Post('AddBankdeposit')
  @UseInterceptors(
    FileInterceptor('Bankattachmenturl'),
  )
  async AddBankDeposit(
    @UploadedFile()
    file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response) {
    const Bankattachmenturl = await this.s3service.Addimage(file)
    const Banktransfer = new BankTransfer();
    Banktransfer.Bankattachmenturl =Bankattachmenturl
    Banktransfer.DepositFrom = req.body.DepositFrom
    Banktransfer.DepositTo = req.body.DepositTo
    Banktransfer.ChequeDate =req.body.ChequeDate
    Banktransfer.TransactionId =req.body.TransactionId
    Banktransfer.Amount =req.body.Amount
    await this.BankTransferRepository.save(Banktransfer)
    return res.status(HttpStatus.OK).send({ status: "success", message: " Banktransfer Deposit Request Successfull", })
  }

  @Get('getbankdeposit/:id')
  async getbankdeposit(
    @Param('id') id:string,
    @Req() req: Request,
    @Res() res: Response
    ){
    const cashdeposit= await this.depositService.Findbankdeposit(id)
    return res.status(HttpStatus.OK).json({cashdeposit})
  }

  @Get('allbankdeposit')
  async getAllbankdeposit(
    @Req() req: Request,
    @Res() res: Response
    ){
    const Allcashdeposit= await this.depositService.FindAllbankdeposit()
    return res.status(HttpStatus.OK).json({Allcashdeposit})
  }



}
