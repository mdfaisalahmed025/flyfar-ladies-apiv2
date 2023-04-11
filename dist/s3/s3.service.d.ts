/// <reference types="multer" />
import { AlbumImage } from './../tourpackage/entities/albumimage.entity';
import { ConfigService } from '@nestjs/config';
import { MainImage } from 'src/tourpackage/entities/mainimage.entity';
import { Tourpackage } from 'src/tourpackage/entities/tourpackage.entity';
import { VisitedPlace } from 'src/tourpackage/entities/visitedplace.entity';
import { Repository } from 'typeorm';
export declare class S3Service {
    private TourpackageRepo;
    private AlbumimageRepo;
    private MainImageeRepo;
    private VisitedPlaceRepo;
    private ConfigService;
    private logger;
    private region;
    private s3;
    constructor(TourpackageRepo: Repository<Tourpackage>, AlbumimageRepo: Repository<AlbumImage>, MainImageeRepo: Repository<MainImage>, VisitedPlaceRepo: Repository<VisitedPlace>, ConfigService: ConfigService);
    Addimage(file: Express.Multer.File): Promise<string>;
    updateImage(Id: number, file: Express.Multer.File): Promise<string>;
    updateAlbumImage(Id: number, AlbumId: number, file: Express.Multer.File): Promise<string>;
    updateMainImage(Id: number, mainimgId: number, file: Express.Multer.File): Promise<string>;
    updatevisitedImage(Id: number, VimageId: number, file: Express.Multer.File): Promise<string>;
}
