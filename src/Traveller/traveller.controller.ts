
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseFilePipeBuilder, Patch, Post, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { CreateTravellerDto } from "./Dto/create-traveller.dto";
import { TravellerServices } from './traveller.services';
import { Request, Response } from 'express';
import { updateTravellerDto } from "./Dto/update-traveller.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { Traveller } from "./entities/traveller.entity";
import { async } from "rxjs";
import { Repository } from "typeorm/repository/Repository";
import { InjectRepository } from "@nestjs/typeorm";


@Controller('Traveller')
export class TravellerController {
   constructor(@InjectRepository(Traveller) private tarvellerRepository: Repository<Traveller>,
      private readonly travellerServices: TravellerServices) { }

   //Add Traveller
   @Post('addtraveller')
   @UseInterceptors(
      FilesInterceptor('passportimage', 5, {
         storage: diskStorage({
            destination: './passportimage',
            filename: (req, image, callback) => {
               // const uniqueSuffix = Date.now() + '-' +Math.round(Math.random()*1e9);
               // const ext = extname(image.originalname)
               const filename = `${image.originalname}`;
               callback(null, filename);
            },
         }),
      }),
   )
   async AddTraveller(
      @UploadedFiles(
         new ParseFilePipeBuilder()
            .addFileTypeValidator({
               fileType: /(jpg|jpeg|png|gif)$/,
            })
            .addMaxSizeValidator({
               maxSize: 1024 * 1024 * 6,
            })
            .build({
               errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            }),
      )
      files: Express.Multer.File[],
      @Body() travellerDto: CreateTravellerDto,
      @Req() req: Request,
      @Res() res: Response) {
      for (const file of files) {
         const traveller = new Traveller();
         traveller.PassportCopyURL = file.path
         traveller.FirstName = req.body.FirstName
         traveller.LastName = req.body.LastName
         traveller.PassportNumber = req.body.PassportNumber
         traveller.PassportExpireDate = req.body.PassportExpireDate
         traveller.DOB = req.body.DOB
         traveller.Gender = req.body.Gender
         await this.tarvellerRepository.save({ ...traveller })
      }
      return res.status(HttpStatus.OK).send({ status: "success", message: "Traveller added succesfully" })
   }


   // all Traveller

   @Get('Alltraveller')
   async FindAll(
      @Req() req: Request,
      @Res() res: Response) {
      const traveller = await this.travellerServices.FindAllTraveller();
      return res.status(HttpStatus.OK).json({ traveller });
   }

   // get traveller dashbboard
   @Get(':id')
   async TravellerDashboard(
      @Param('id') id: number,
      @Req() req: Request,
      @Res() res: Response) {
      const traveller = await this.travellerServices.FindTrveller(id);
      return res.status(HttpStatus.OK).json({ traveller });
   }

   @Patch(':id')
   async updateTraveller(
      @Param('id') id: number,
      @Res() res: Response,
      @Body() updateTravellerdto: updateTravellerDto) {
      await this.travellerServices.UpdateTravller(+id, updateTravellerdto)
      return res.status(HttpStatus.OK).json({ status: "success", message: 'traveller updated successfully' });
   }

   @Delete(':id')
   async DeleteTraveller(
      @Param('id') id: number,
      @Req() req: Request,
      @Res() res: Response) {
      await this.travellerServices.DeleteTraveller(id)
      return res.status(HttpStatus.OK).json({ message: 'traveller has deleted' });
   }

}