import { S3Service } from './../s3/s3.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingPolicyDto } from './dto/creat-bookingpolicy.dto';
import { CreatepackageExclsuionsDto } from './dto/create-packageexclusions.dto';
import { CreatePackageHighlightDto } from './dto/create-packagehighlights.dto';
import { createpackageincluionDto } from './dto/create-packageInclusion.dto';
import { CreateTourPackagePlanDto } from './dto/create-packagetourplan.dto';
import { createRefundPolicyDto } from './dto/create-refundpolicy.dto';
import { createPackageIncludeDto } from './dto/crteate-packageInlcude.dto';
import { updateBookingPolicyDto } from './dto/update-bookingpolicy.dto';
import { updatepackageExclusionsDto } from './dto/update-packageexclsuions.dto';
import { UpdatepackageHighlightDto } from './dto/update-packagehighlightdto';
import { UpdateTourpackageIncludedDto } from './dto/update-packageInclude.dto';
import { updatepackageInclusionDto } from './dto/update-packageincluion.dto';
import { UpdateRefundPolicy } from './dto/update-refundpolicy.dto';
import { UpdateTourpackageDto } from './dto/update-tourpackage.dto';
import { updateTourPackagePlanDto } from './dto/update-tourpackageplan.dto';
import { AlbumImage } from './entities/albumimage.entity';
import { bookingpolicy } from './entities/bookingpolicy.entity';
import { MainImage } from './entities/mainimage.entity';
import { packageexcluions } from './entities/packageexclsuions.entity';
import { packagehighlight } from './entities/packagehighlight.entity';
import { Packageinclusion } from './entities/packageInclusion.entitry';
import { refundpolicy } from './entities/refundpolicy.entity';
import { Tourpackage } from './entities/tourpackage.entity';
import { tourpackageplan } from './entities/tourpackageplan.entity';
import { VisitedPlace } from './entities/visitedplace.entity';

// tour package ser
@Injectable()
export class TourpackageService {

constructor(
@InjectRepository(Tourpackage)
private TourpackageRepo:Repository<Tourpackage>,
@InjectRepository(Packageinclusion)
private packageInclusionRepo: Repository<Packageinclusion>,
@InjectRepository(tourpackageplan)
private tourpackagePlanRepo: Repository<tourpackageplan>,
@InjectRepository(packageexcluions)
private packageexcluionsRepo: Repository<packageexcluions>,
@InjectRepository(packagehighlight)
private packageHighlightRepo: Repository<packagehighlight>,
@InjectRepository(bookingpolicy)
private bookingPolicyRepo: Repository<bookingpolicy>,
@InjectRepository(refundpolicy)
private refundPolicyRepo: Repository<refundpolicy>,
@InjectRepository(AlbumImage)
private AlbumImageRepo: Repository<AlbumImage>,
@InjectRepository(MainImage) private MainImageRepo: Repository<MainImage>,
@InjectRepository(VisitedPlace)
private visitedImageRepo: Repository<VisitedPlace>,
){}

async findAll() {
    return this.TourpackageRepo.find();
  }

async  findOne(Id: number) {
    const gettourpackage =  this.TourpackageRepo.findOne({where:{Id}});
    if (!gettourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return gettourpackage;
  }

  async  findOneByLocation(Location: string) {
    const location =  this.TourpackageRepo.find({where:{Location}});
    if (!location) {
      throw new HttpException(
        `Tour package not availabe with ${Location}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return location;
  }

async  updatePackage(Id: number, updateTourpackageDto: UpdateTourpackageDto) {
    return await this.TourpackageRepo.update({Id}, {...updateTourpackageDto});
  }

async  remove(Id: number) {
  const tourpackage=  this.TourpackageRepo.findOne({where:{Id}});
  if (!tourpackage) {
    throw new HttpException(
      `TourPackage not found with this id=${Id}`,
      HttpStatus.BAD_REQUEST,
    );
  }
    return  this.TourpackageRepo.delete(Id);
  }

  // get all Album image
  async FindAlbum(Id: number, AlbumTitle:string) {
    const tourpackage = await this.TourpackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const AlbumImage = await this.AlbumImageRepo.find({where:{AlbumTitle}})
    if (!AlbumImage) {
      throw new HttpException(
        `Image not found with `,
        HttpStatus.BAD_REQUEST,
      );
    }
    return AlbumImage;
  }

  async FindAllAlbum(Id: number) {
    const tourpackage = await this.TourpackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const AllAlbumImage = await this.AlbumImageRepo.find({})
    if (!AllAlbumImage) {
      throw new HttpException(
        `Image not found with `,
        HttpStatus.BAD_REQUEST,
      );
    }
    return AllAlbumImage;
  }
  

  async AllMainImage(Id: number) {
    const tourpackage = await this.TourpackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const MainImage = await this.MainImageRepo.find({})
    if (!MainImage) {
      throw new HttpException(
        `Image not found with `,
        HttpStatus.BAD_REQUEST,
      );
    }
    return MainImage;
  }


//visited image
  async FindAllvisitedImage(Id: number,) {
    const tourpackage = await this.TourpackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const visitedImage = await this.visitedImageRepo.find({})
    if (!AlbumImage) {
      throw new HttpException(
        `Image not found with `,
        HttpStatus.BAD_REQUEST,
      );
    }
    return visitedImage;
  }



  // booking policy start.........................

  //add booking policy
  async createbookingPolicy(Id: number, CreateBookingPolicyDto:CreateBookingPolicyDto ) {
    const tourpackage = await this.TourpackageRepo.findOneBy({ Id });
    if (!tourpackage) {
      throw new HttpException(
        "TourPackage not found, cann't add cover image",
        HttpStatus.BAD_REQUEST,
      );
    }
    const creatpolicy = await this.bookingPolicyRepo.create({ ...CreateBookingPolicyDto, tourpackage });
    const createdpolicy = await this.bookingPolicyRepo.save(creatpolicy)
    return createdpolicy

  }



  // find booking policy
  async FindbookingPolicy(Id: number, BkId: number) {
    const tourpackage = await this.TourpackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const bookingpolicy = await this.bookingPolicyRepo.findOne({ where: { BkId } })
    if (!bookingpolicy) {
      throw new HttpException(
        `booking policy not found with this id=${BkId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return bookingpolicy;
  }

  //update booking policy
  async updateBookingolicy(Id: number, BkId: number, updateBOokingPolicy: updateBookingPolicyDto) {
    const tourpackage = await this.TourpackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const bookingpolicy = await this.bookingPolicyRepo.findOne({ where: { BkId } })
    if (!bookingpolicy) {
      throw new HttpException(
        `booking policy not found with this id=${BkId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const updatepolicy = await this.bookingPolicyRepo.update({ BkId }, { ...updateBOokingPolicy })
    return updatepolicy;
  }


  //Delete booking policy
  async DeletebookingPolicy(Id: number, BkId: number) {
    const tourpackage = await this.TourpackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const bookingpolicy = await this.bookingPolicyRepo.findOne({ where: { BkId } })
    if (!bookingpolicy) {
      throw new HttpException(
        `booking policy not found with this id=${BkId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.bookingPolicyRepo.delete(BkId);
  }

  //End Booking Policy..........................



  // start refund policy
  async AddRefundPolicy(
    Id: number,
    refundpolicydto: createRefundPolicyDto,
  ) {
    const tourpackage = await this.TourpackageRepo.findOneBy({ Id });
    if (!tourpackage) {
      throw new HttpException(
        "TourPackage not found, cann't add cover image",
        HttpStatus.BAD_REQUEST,
      );
    }
    const createrefundpolicy = this.refundPolicyRepo.create({...refundpolicydto,tourpackage });
    const newrefundpolicy = await this.refundPolicyRepo.save(
      createrefundpolicy,
    );
    return newrefundpolicy;

  }


  // get refund policy
  async FindRefundPolicy(Id: number, RId: number) {
    const tourpackage = await this.TourpackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const refundpolicy = await this.refundPolicyRepo.findOne({ where: { RId } })
    if (!refundpolicy) {
      throw new HttpException(
        `refund policy not found with this id=${RId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return refundpolicy;
  }


  // update Refund policy
  async updateRefundolicy(Id: number, RId: number, updaterefundPolicy: UpdateRefundPolicy) {
    const tourpackage = await this.TourpackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const bookingpolicy = await this.refundPolicyRepo.findOne({ where: { RId } })
    if (!bookingpolicy) {
      throw new HttpException(
        `Refund policy not found with this id=${RId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const updatepolicy = await this.refundPolicyRepo.update({ RId }, { ...updaterefundPolicy })
    return updatepolicy;
  }


  //Delete refund policy
  async DeleterefundPolicy(Id: number, RId: number) {
    const tourpackage = await this.TourpackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const Refundpolicy = await this.refundPolicyRepo.findOne({ where: { RId } })
    if (!Refundpolicy) {
      throw new HttpException(
        `Refund policy not found with this id=${RId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.refundPolicyRepo.delete(RId);
  }

// ///End refund Policy

// //  Add package inclusions


  async AddInclusions(
    Id: number,
    inclusionsDto: createpackageincluionDto,
  ) {
    const tourpackage = await this.TourpackageRepo.findOneBy({ Id });
    if (!tourpackage) {
      throw new HttpException(
        "TourPackage not found, cann't add cover image",
        HttpStatus.BAD_REQUEST,
      );
    }
    const newInclusions = await this.packageInclusionRepo.create({ ...inclusionsDto, tourpackage });
    const saveinclsuions = await this.packageInclusionRepo.save(newInclusions)
    return saveinclsuions;
  }

  // find inclusions
  async FindInclsuions(Id: number, InId: number) {
    const tourpackage = await this.TourpackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const inclusions = await this.packageInclusionRepo.findOne({ where: { InId } })
    if (!inclusions) {
      throw new HttpException(
        `Inclusions not found with this id=${InId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return inclusions;
  }



  // update inclusions
  async updateInclusions(Id: number, InId: number, updateInclusionsDto: updatepackageInclusionDto) {
    const tourpackage = await this.TourpackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const inclsuions = await this.packageInclusionRepo.findOne({ where: { InId } })
    if (!inclsuions) {
      throw new HttpException(
        `inclusions not found with this id=${InId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const updateinclusion = await this.packageInclusionRepo.update({ InId }, { ...updateInclusionsDto })
    return updateinclusion;
  }


  // Delete Inclusions
  async DeleteInclusion(Id: number, InId: number) {
    const tourpackage = await this.TourpackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const inclusions = await this.packageInclusionRepo.findOne({ where: { InId } })
    if (!inclusions) {
      throw new HttpException(
        `Inclsuions not found with this id=${InId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.packageInclusionRepo.delete(InId);
  }

  /// end inclusions....................

  /// start package exclsuions

  //add exclsuions

  async AddpackageExclsuions(
    Id: number,
    exclusiondto: CreatepackageExclsuionsDto,
  ) {

    const tourpackage = await this.TourpackageRepo.findOneBy({ Id });
    if (!tourpackage) {
      throw new HttpException(
        "TourPackage not found, cann't add cover image",
        HttpStatus.BAD_REQUEST,
      );
    }
    const exclusion = await this.packageexcluionsRepo.create({ ...exclusiondto, tourpackage });
    await this.packageexcluionsRepo.save(exclusion);

  }

  // find Exclusions
  async FindExclsuions(Id: number, ExId: number) {
    const tourpackage = await this.TourpackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const Exclusions = await this.packageexcluionsRepo.findOne({ where: { ExId } })
    if (!Exclusions) {
      throw new HttpException(
        `Exclusions not found with this id=${ExId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return Exclusions;
  }

  // update inclusions
  async updateExclusions(Id: number, ExId: number, updateExlusionsDto: updatepackageExclusionsDto) {
    const tourpackage = await this.TourpackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const exclsuions = await this.packageexcluionsRepo.findOne({ where: { ExId } })
    if (!exclsuions) {
      throw new HttpException(
        `exclsuions not found with this id=${ExId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const updateExclsuions = await this.packageexcluionsRepo.update({ ExId }, { ...updateExlusionsDto })
    return updateExclsuions;
  }


  // Delete exclusions
  async DeleteIExclusion(Id: number, ExId: number) {
    const tourpackage = await this.TourpackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  const exclusions = await this.packageexcluionsRepo.findOne({ where: { ExId } })
    if (!exclusions) {
      throw new HttpException(
        `exclusions not found with this id=${ExId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.packageexcluionsRepo.delete(ExId);
  }

  // End exclusions


  //start  included


  async AddTourpackagePlan(
    Id: number,
    tourpackageplandto: CreateTourPackagePlanDto,
  ) {
    const tourpackage = await this.TourpackageRepo.findOneBy({ Id });
    if (!tourpackage) {
      throw new HttpException(
        "TourPackage not found, cann't add tourplan",
        HttpStatus.BAD_REQUEST,
      );
    }
    const createpackageplan =
      this.tourpackagePlanRepo.create({ ...tourpackageplandto,tourpackage });
    const savenewpackageplan = await this.tourpackagePlanRepo.save(
      createpackageplan,
    );
    return savenewpackageplan;

  }
  
  // find Exclusions
  async Finddayplan(Id: number, dayId: number) {
    const tourpackage = await this.TourpackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const dayplan = await this.tourpackagePlanRepo.findOne({ where: { dayId } })
    if (!dayplan) {
      throw new HttpException(
        `tour plan not found not found with this id=${dayId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return dayplan;
  }

  // update inclusions
  async updatedayplan(Id: number, dayId: number, updatedayplanDto: updateTourPackagePlanDto) {
    const tourpackage = await this.TourpackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const dayplan = await this.tourpackagePlanRepo.findOne({ where: { dayId } })
    if (!dayplan) {
      throw new HttpException(
        `day plan not found with this id=${dayId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const uodatedayplan = await this.tourpackagePlanRepo.update({ dayId }, { ...updatedayplanDto })
    return uodatedayplan;
  }


  // Delete exclusions
  async DeleteIdayplan(Id: number, dayId: number) {
    const tourpackage = await this.TourpackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const dayplan = await this.tourpackagePlanRepo.findOne({ where: { dayId } })
    if (!dayplan) {
      throw new HttpException(
        `Inclsuions not found with this id=${dayId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.tourpackagePlanRepo.delete(dayId);
  }


  // startr highlights


  // Add package highlight




  async AddPackageHighlight(
    Id: number,
    packagehighlightdto: CreatePackageHighlightDto,
  ) {
    const tourpackage = await this.TourpackageRepo.findOneBy({ Id });
    if (!tourpackage) {
      throw new HttpException(
        "TourPackage not found, cann't add cover image",
        HttpStatus.BAD_REQUEST,
      );
    }
    const createHightlight =
      this.packageHighlightRepo.create({ ...packagehighlightdto, tourpackage });
    const saveHighlight = await this.packageHighlightRepo.save(
      createHightlight,
    );
    return saveHighlight;

  }


  // find highlight
  async FindHighlight(Id: number, HiId: number) {
    const tourpackage = await this.TourpackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const Highlight = await this.packageHighlightRepo.findOne({ where: { HiId } })
    if (!Highlight) {
      throw new HttpException(
        `Package highlight not found with this id ${HiId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return Highlight;
  }

  // update inclusions
  async updateHighlight(Id: number, HiId: number, updateHighlightDto: UpdatepackageHighlightDto) {
    const tourpackage = await this.TourpackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const highlight = await this.packageHighlightRepo.findOne({ where: { HiId } })
    if (!highlight) {
      throw new HttpException(
        `Package highlight found with this id=${HiId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const updatedhighlight = await this.packageHighlightRepo.update({ HiId }, { ...updateHighlightDto })
    return updatedhighlight;
  }


  // Delete exclusions
  async DeleteHighlight(Id: number, HiId: number) {
    const tourpackage = await this.TourpackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const highlight = await this.packageHighlightRepo.findOne({ where: { HiId } })
    if (!highlight) {
      throw new HttpException(
        `Package highlight not found with this id=${HiId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.packageHighlightRepo.delete(HiId);
  }

}

// end of travel package




