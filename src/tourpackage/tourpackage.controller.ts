import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, ParseFilePipeBuilder, HttpStatus, ParseIntPipe, Req, Res, ParseFilePipe, FileTypeValidator, HttpException } from '@nestjs/common';
import { TourpackageService } from './tourpackage.service';
import { UpdateTourpackageDto } from './dto/update-tourpackage.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request, Response } from 'express';
import { Tourpackage } from './entities/tourpackage.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumImage } from './entities/albumimage.entity';
import { VisitedPalce } from './entities/visitedplace.entity';
import { CreateBookingPolicyDto } from './dto/creat-bookingpolicy.dto';
import { updateBookingPolicyDto } from './dto/update-bookingpolicy.dto';
import { createRefundPolicyDto } from './dto/create-refundpolicy.dto';
import { UpdateRefundPolicy } from './dto/update-refundpolicy.dto';
import { createpackageincluionDto } from './dto/create-packageInclusion.dto';
import { updatepackageInclusionDto } from './dto/update-packageincluion.dto';
import { CreateTourPackagePlanDto } from './dto/create-packagetourplan.dto';
import { updateTourPackagePlanDto } from './dto/update-tourpackageplan.dto';
import { CreatepackageExclsuionsDto } from './dto/create-packageexclusions.dto';
import { updatepackageExclusionsDto } from './dto/update-packageexclsuions.dto';
import { CreatePackageHighlightDto } from './dto/create-packagehighlights.dto';
import { UpdatepackageHighlightDto } from './dto/update-packagehighlightdto';
import { createPackageIncludeDto } from './dto/crteate-packageInlcude.dto';
import { UpdateTourpackageIncludedDto } from './dto/update-packageInclude.dto';

@Controller('tourpackage')
export class TourpackageController {
  constructor(
    @InjectRepository(Tourpackage) private TourpackageRepo:Repository<Tourpackage>,
    @InjectRepository(AlbumImage) private VisitedmageRepo: Repository<AlbumImage>,
    @InjectRepository(VisitedPalce) private AlbumimageRepo: Repository<AlbumImage>,
     private readonly tourpackageService: TourpackageService) {}

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
  @Body() body,
  @Body() updatetravelpackagedto:UpdateTourpackageDto) {
    const update = await this.tourpackageService.update(Id,updatetravelpackagedto)
  // update.MainTitle = req.body.MainTitle
  // update.PkId= req.body.PkId
  // update.SubTitle =req.body.SubTitle
  // update.Price =req.body.Price
  // update.Location =req.body.Location
  // update.Availability =req.body.Availability
  // update.StartDate =req.body.StartDate
  // update.EndDate =req.body.EndDate
  // update.TripType =req.body.TripType
  // update.TotalDuration =req.body.TotalDuration
  // update.PackageOverview =req.body.PackageOverview
  // update.Showpackage =req.body.Showpackage
  // await this.TourpackageRepo.save({ ...update})
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

  
// add booking policy
@Post(':id/AddBookingPolicy')
addTourPackageBookingPolicy(
  @Param('id', ParseIntPipe) id: number,
  @Body() bookingpolicydto: CreateBookingPolicyDto,
  @Req() req: Request,
  @Res() res: Response,
) {

  this.tourpackageService.createbookingPolicy(
    id,
    bookingpolicydto,
  );
  return res.status(HttpStatus.OK).json({
    status:"success",
    message: 'booking policy added',
  });
}




  @Get(':id/getpolicy/:BkId')
  async getsingleBookingPolicy(
    @Param('id') id: number,
    @Param('BkId') BkId: number,
    @Req() req: Request,
    @Res() res: Response) {
    const bookingpolicy = await this.tourpackageService.FindbookingPolicy(id, BkId)
    return res.status(HttpStatus.OK).json({status:"success",bookingpolicy
    });
  }



  // update booking policy  
  @Patch(':id/updatepolicy/:BkId')
  async updateBookingPolicy(
    @Param('id') id: number,
    @Param('BkId') BkId: number,
    @Body() updatebookingpolicyDto: updateBookingPolicyDto,
    req: Request,
    @Res() res: Response,
  ) {
    const updatebooking = await this.tourpackageService.updateBookingolicy(id, BkId, updatebookingpolicyDto)
    return res.status(HttpStatus.OK).json({
      status:"success",
      message: `Booking policy updated successfully`,
    });
  }

  @Delete(':id/deletepolicy/:BkId')
  async DeleteBookingPolicy(
    @Param('id') id: number,
    @Param('BkId') BkId: number,
    @Req() req: Request,
    @Res() res: Response) {
    await this.tourpackageService.DeletebookingPolicy(id, BkId)
    return res.status(HttpStatus.OK).json({
      status:"success",
      message: `booking policy deleted successfully`,
    });
  }

  // booking policy end


  //refund policy start

  @Post(':id/AddrefundPolicy')
  async addrefundPolicy(
    @Param('id', ParseIntPipe) id: number,
    @Body() refundpolicydto: createRefundPolicyDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.tourpackageService.AddRefundPolicy(
      id,
      refundpolicydto,
    );
    return res.status(HttpStatus.OK).json({
      status:"success",
      message: 'travel package refundpolicy policy added',
    });
  }

  // get refund policy
  @Get(':id/getrefundpolicy/:RId')
  async getsinglerefundPolicy(
    @Param('id') id: number,
    @Param('RId') RId: number,
    @Req() req: Request,
    @Res() res: Response) {
    const refundpolicy = await this.tourpackageService.FindRefundPolicy(id, RId)
    return res.status(HttpStatus.OK).json({refundpolicy});
  }

  // update refund policy  
  @Patch(':id/updateRefundpolicy/:RId')
  async updateRefundPolicy(
    @Param('id') id: number,
    @Param('RId') RId: number,
    @Body() updateRefundlicyDto: UpdateRefundPolicy,
    req: Request,
    @Res() res: Response,
  ) {
    const updaterefund = await this.tourpackageService.updateRefundolicy(id, RId, updateRefundlicyDto)
    return res.status(HttpStatus.OK).json({
      status:"success",
      message: `refund policy has updated successfully`,
      updaterefund,
    });
  }


  // delete refund policy
  @Delete(':id/deleteRefundpolicy/:RId')
  async DeleteRefundPolicy(
    @Param('id') id: number,
    @Param('RId') RId: number,
    @Req() req: Request,
    @Res() res: Response) {
    await this.tourpackageService.DeleterefundPolicy(id, RId)
    return res.status(HttpStatus.OK).json({
      status:"success",
      message: `refund policy Id=${RId} has deleted successfully`,
    });
  }
  // refund policy End

  // Inclusions  start

  // add inclsuions
  @Post(':id/AddPackageInclusions')
 async addInclusion(
    @Param('id', ParseIntPipe) id: number,
    @Body() Inclusionsdto: createpackageincluionDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.tourpackageService.AddInclusions(
      id,
      Inclusionsdto,
    );
    return res.status(HttpStatus.OK).json({
      status:"success",
      message: 'travel package Inlclusions Iteam Added',
    });
  }

  // get Singel Inclsuions

  @Get(':id/getinclsuions/:InId')
  async getsingleInclsuions(
    @Param('id') id: number,
    @Param('InId') InId: number,
    @Req() req: Request,
    @Res() res: Response) {
    const inclsuions = await this.tourpackageService.FindInclsuions(id, InId)
    return res.status(HttpStatus.OK).json({inclsuions
    });
  }


  // update refund policy  
  @Patch(':id/updateInclsuions/:InId')
  async updateInclsuions(
    @Param('id') id: number,
    @Param('InId') InId: number,
    @Body() updateInclusionsDto: updatepackageInclusionDto,
    req: Request,
    @Res() res: Response,
  ) {
    const updateInclsuions = await this.tourpackageService.updateInclusions(id, InId, updateInclusionsDto)
    return res.status(HttpStatus.OK).json({
      message: `Inclsuions with Id=${InId} has updated successfully`,
      updateInclsuions,
    });
  }


  // delete Inclsuions
  @Delete(':id/deleteinclusions/:InId')
  async DeleteExcluions(
    @Param('id') id: number,
    @Param('InId') InId: number,
    @Req() req: Request,
    @Res() res: Response) {
    await this.tourpackageService.DeleteInclusion(id, InId)
    return res.status(HttpStatus.OK).json({
      status:"success",
      message: `Inclusion has deleted successfully`,
    });
  }

  //End refund policy


  @Get(':id/FindAllAlbum/AllAlbumImage')
  async getAllCardeImage(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response) {
    const Albumimages = await this.tourpackageService.FindAllAlbum(id)
    return res.status(HttpStatus.OK).json({
      Albumimages,
    });
  }

  @Post(':Id/AddalbumImage')
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: diskStorage({
        destination: './AlbumImages',
        filename: (req, image, callback) => {
          const filename = `${image.originalname}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async AddalbumImages(
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
    @Param('Id', ParseIntPipe) Id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const tourpackage = await this.TourpackageRepo.findOneBy({ Id });
    if (!tourpackage) {
      throw new HttpException(
        "TourPackage not found, cann't add cover image",
        HttpStatus.BAD_REQUEST,
      );
    }

    for (const file of files) {
      const newalbum = new AlbumImage();
      newalbum.path = file.path
      newalbum.destination = file.destination
      newalbum.filename = file.filename
      newalbum.fieldname = file.fieldname
      newalbum.AlbumTitle = req.body.AlbumTitle
      await this.VisitedmageRepo.save({...newalbum, tourpackage })
    }
    return res.status(HttpStatus.OK).send({  
      status:"success", 
      message: "album Image Added Successfully"})
  }


  @Post(':Id/AddvistitedImages')
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: diskStorage({
        destination: './vistitedplaceimages',
        filename: (req, image, callback) => {
          // const uniqueSuffix = Date.now() + '-' +Math.round(Math.random()*1e9);
          // const ext = extname(image.originalname)
          const filename = `${image.originalname}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async AddvistitedImages(
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
    @Param('Id', ParseIntPipe) Id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const tourpackage = await this.TourpackageRepo.findOneBy({ Id });
    if (!tourpackage) {
      throw new HttpException(
        "TourPackage not found, cann't add cover image",
        HttpStatus.BAD_REQUEST,
      );
    }
    
    for (const file of files) {
      const newalbum = new VisitedPalce();
      newalbum.path = file.path
      newalbum.destination = file.destination
      newalbum.filename = file.filename
      newalbum.fieldname = file.fieldname;
      newalbum.PlaceName = req.body.PlaceName;
      await this.AlbumimageRepo.save({ ...newalbum, tourpackage })
    }
    return res.status(HttpStatus.OK).send({ message: "visited Image Added Successfully", Tourpackage })
  }


  @Get(':id/visitedImage/getAllvisitedImage')
  async getAllvisitedImage(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response) {
    const visitedImage = await this.tourpackageService.FindAllvisitedImage(id)
    return res.status(HttpStatus.OK).json({
    visitedImage
    });
  }


  /// add tour package 

  @Post(':id/AddTourPackagePlan')
  addTourPackagePlan(
    @Param('id', ParseIntPipe) id: number,
    @Body() tourpackagePlandto: CreateTourPackagePlanDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const tourpackageplan = this.tourpackageService.AddTourpackagePlan(
      id,
      tourpackagePlandto,
    );
    return res.status(HttpStatus.OK).json({
      tourpackageplan,
      message: 'travel package plan added Iteam Added',
    });
  }


  @Get(':id/tourplan/:dayId')
  async getdayplan(
    @Param('id') id: number,
    @Param('dayId') dayId: number,
    @Req() req: Request,
    @Res() res: Response) {
    const tourplan = await this.tourpackageService.Finddayplan(id, dayId)
    return res.status(HttpStatus.OK).json({tourplan});
  }

  //update package exclsuions

  @Patch(':id/updateplan/:dayId')
  async updatePackageplan(
    @Param('id') id: number,
    @Param('dayId') dayId: number,
    @Body() updatedayplanDto: updateTourPackagePlanDto,
    req: Request,
    @Res() res: Response,
  ) {
    const updatedayplan = await this.tourpackageService.updatedayplan(id, dayId, updatedayplanDto)
    return res.status(HttpStatus.OK).json({
      message: `dayplan with Id=${dayId} has updated successfully`,
      updatedayplan,
    });
  }


  // delete excluions
  @Delete(':id/deletedayplan/:dayId')
  async DeleteDay(
    @Param('id') id: number,
    @Param('dayId') dayId: number,
    @Req() req: Request,
    @Res() res: Response) {
    await this.tourpackageService.DeleteIdayplan(id, dayId)
    return res.status(HttpStatus.OK).json({
      message: `dayplan Id=${dayId} has deleted successfully`,
    });
  }



  /// addd package excluions
  @Post(':id/AddTourPackageExclusions')
  async addTourPackageExclusions(
    @Param('id', ParseIntPipe) id: number,
    @Body() packageexcluionsdto: CreatepackageExclsuionsDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const exclsuions = await this.tourpackageService.AddpackageExclsuions(
      id,
      packageexcluionsdto,
    );
    return res.status(HttpStatus.OK).send({ message: "exlusions  Added Successfully", exclsuions })
  }

  // get package exclsuions

  @Get(':id/Exclsuions/:ExId')
  async getPackageExclsuions(
    @Param('id') id: number,
    @Param('ExId') ExId: number,
    @Req() req: Request,
    @Res() res: Response) {
    const exclsuions = await this.tourpackageService.FindExclsuions(id, ExId)
    return res.status(HttpStatus.OK).json({
      exclsuions
    });
  }

  //update package exclsuions



  @Patch(':id/updateExclsuions/:ExId')
  async updateExlsuions(
    @Param('id') id: number,
    @Param('ExId') ExId: number,
    @Body() updateExclusionsDto: updatepackageExclusionsDto,
    req: Request,
    @Res() res: Response,
  ) {
    const updateexlsuions = await this.tourpackageService.updateExclusions(id, ExId, updateExclusionsDto)
    return res.status(HttpStatus.OK).json({
      message: `Exclsuions with Id=${ExId} has updated successfully`,
      updateexlsuions,
    });
  }


  // delete excluions

  @Delete(':id/deleteExclusions/:ExId')
  async DeleteIncluions(
    @Param('id') id: number,
    @Param('ExId') ExId: number,
    @Req() req: Request,
    @Res() res: Response) {
    await this.tourpackageService.DeleteIExclusion(id, ExId)
    return res.status(HttpStatus.OK).json({
      message: `Exclusion Id=${ExId} has deleted successfully`,
    });
  }
  // end exclusions....................





  // start package highlight............

  // add tour package highlight
  @Post(':id/AddTourPackageHighlight')
  addTourPackageHighlight(
    @Param('id', ParseIntPipe) id: number,
    @Body() packageHighlightdto: CreatePackageHighlightDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const tourpackagehighlight = this.tourpackageService.AddPackageHighlight(
      id,
      packageHighlightdto,
    );
    return res.status(HttpStatus.OK).json({
      message: 'travel package Highlight added', tourpackagehighlight
    });
  }




  @Get(':id/getHighlight/:HiId')
  async getPackageHighlight(
    @Param('id') id: number,
    @Param('HiId') HiId: number,
    @Req() req: Request,
    @Res() res: Response) {
    const Highlight = await this.tourpackageService.FindHighlight(id, HiId)
    return res.status(HttpStatus.OK).json({Highlight
    });
  }

  //update package Highlight



  @Patch(':id/updateHighlight/:HiId')
  async updateHiId(
    @Param('id') id: number,
    @Param('HiId') HiId: number,
    @Body() updatehighlightDto: UpdatepackageHighlightDto,
    req: Request,
    @Res() res: Response,
  ) {
    const updateHighlight = await this.tourpackageService.updateHighlight(id, HiId, updatehighlightDto)
    return res.status(HttpStatus.OK).json({
      message: `Highlight with Id ${HiId} has updated successfully`,
      updateHighlight,
    });
  }


  // delete Highlight

  @Delete(':id/DeleteHighlight/:HiId')
  async DeleteHighlight(
    @Param('id') id: number,
    @Param('HiId') HiId: number,
    @Req() req: Request,
    @Res() res: Response) {
    await this.tourpackageService.DeleteHighlight(id, HiId)
    return res.status(HttpStatus.OK).json({
      message: `Highlight Id ${HiId} has deleted successfully`,
    });
  }



  

// start included item package 
  @Post(':id/AddPackageIncluded')
  addpackageIncluded(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    createpackageIncludeDto: createPackageIncludeDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const packageincluded = this.tourpackageService.AddpackageIncluded(
      id,
      createpackageIncludeDto,
    );
    return res.status(HttpStatus.OK).send({
      packageincluded,
      message: 'travel package Inlcluded Iteam Added',
    });
  }



  @Get(':id/getIncluded/:InId')
  async getPackageIncluded(
    @Param('id') id: number,
    @Param('InId') InId: number,
    @Req() req: Request,
    @Res() res: Response) {
    const Included = await this.tourpackageService.Findincluded(id, InId)
    return res.status(HttpStatus.OK).json({
      Included,
    });
  }

  //update package Highlight



  @Patch(':id/updateIncluded/:InId')
  async updateIncluded(
    @Param('id') id: number,
    @Param('InId') InId: number,
    @Body() updateIncludedDto: UpdateTourpackageIncludedDto,
    req: Request,
    @Res() res: Response,
  ) {
    const Included = await this.tourpackageService.updateincluded(id, InId, updateIncludedDto)
    return res.status(HttpStatus.OK).json({
      message: `Included with Id ${InId} has updated successfully`,
      Included,
    });
  }


  // delete Highlight

  @Delete(':id/Deleteincluded/:InId')
  async DeleteIncluded(
    @Param('id') id: number,
    @Param('InId') InId: number,
    @Req() req: Request,
    @Res() res: Response) {
    await this.tourpackageService.Deleteincluded(id, InId)
    return res.status(HttpStatus.OK).json({
      message: `Included item Id ${InId} has deleted successfully`,
    });
  }
}
