import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, ParseFilePipeBuilder, HttpStatus, ParseIntPipe, Req, Res, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { TourpackageService } from './tourpackage.service';
import { UpdateTourpackageDto } from './dto/update-tourpackage.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request, Response } from 'express';
import { Tourpackage } from './entities/tourpackage.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('tourpackage')
export class TourpackageController {
  constructor(@InjectRepository(Tourpackage) private TourpackageRepo:Repository<Tourpackage>, private readonly tourpackageService: TourpackageService) {}

  @Post('Addpackage')
  @UseInterceptors(
    FilesInterceptor('image',5,{
      storage: diskStorage({
        destination: './CoverImage',
        filename: (req, image, callback) => {
          // const uniqueSuffix = Date.now() + '-' +Math.round(Math.random()*1e9);
          // const ext = extname(image.originalname)
          const filename = `${image.originalname}`;
          callback(null, filename);
        },
      }),
    }),
  )

  async AddTravelPAckage(
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
    @Req() req: Request,
    @Body() body,
    @Res() res: Response) {
      for (const file of files) {
        const tourpackage = new Tourpackage();
        tourpackage.ImageUrl = file.path
        tourpackage.MainTitle = req.body.MainTitle
        tourpackage.PkId= req.body.PkId
        tourpackage.SubTitle =req.body.SubTitle
        tourpackage.Price =req.body.Price
        tourpackage.Location =req.body.Location
        tourpackage.Availability =req.body.Availability
        tourpackage.StartDate =req.body.StartDate
        tourpackage.EndDate =req.body.EndDate
        tourpackage.TripType =req.body.TripType
        tourpackage.TotalDuration =req.body.TotalDuration
        tourpackage.PackageOverview =req.body.PackageOverview
        tourpackage.Showpackage =req.body.Showpackage
        await this.TourpackageRepo.save({ ...tourpackage})
      }
    return res.status(HttpStatus.OK).send({ status:"success", message:"Travel package added succesfully" })
  }

  @Get('getall')
  findAll() {
    return this.tourpackageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tourpackageService.findOne(+id);
  }

  @Patch(':Id')
 async update( 
  @Param('Id') Id: number,
  @Req() req: Request,
  @Res() res: Response,
  @Body() body) {
  const update = await this.TourpackageRepo.findOne({where:{Id}})
  update.MainTitle = req.body.MainTitle
  update.PkId= req.body.PkId
  update.SubTitle =req.body.SubTitle
  update.Price =req.body.Price
  update.Location =req.body.Location
  update.Availability =req.body.Availability
  update.StartDate =req.body.StartDate
  update.EndDate =req.body.EndDate
  update.TripType =req.body.TripType
  update.TotalDuration =req.body.TotalDuration
  update.PackageOverview =req.body.PackageOverview
  update.Showpackage =req.body.Showpackage
  await this.TourpackageRepo.save({ ...update})
  return res.status(HttpStatus.OK).send({ status:"success", message:"Travel package updated succesfully" })
  }

  @Delete(':id')
 async remove(
  @Param('id') id: string,
  @Req() req: Request,
  @Res() res: Response) {
    await this.tourpackageService.remove(+id);
    return res.status(HttpStatus.OK).send({ status:"success", message:"Travel package deleted succesfully" })
  }
}
