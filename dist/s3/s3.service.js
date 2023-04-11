"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var S3Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const albumimage_entity_1 = require("./../tourpackage/entities/albumimage.entity");
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const mainimage_entity_1 = require("../tourpackage/entities/mainimage.entity");
const tourpackage_entity_1 = require("../tourpackage/entities/tourpackage.entity");
const visitedplace_entity_1 = require("../tourpackage/entities/visitedplace.entity");
const typeorm_2 = require("typeorm");
let S3Service = S3Service_1 = class S3Service {
    constructor(TourpackageRepo, AlbumimageRepo, MainImageeRepo, VisitedPlaceRepo, ConfigService) {
        this.TourpackageRepo = TourpackageRepo;
        this.AlbumimageRepo = AlbumimageRepo;
        this.MainImageeRepo = MainImageeRepo;
        this.VisitedPlaceRepo = VisitedPlaceRepo;
        this.ConfigService = ConfigService;
        this.logger = new common_1.Logger(S3Service_1.name);
        this.region = this.ConfigService.get('DO_REGION') || 'sgp1';
        this.s3 = new client_s3_1.S3Client({
            endpoint: "https://sgp1.digitaloceanspaces.com",
            region: 'sgp1',
            credentials: {
                accessKeyId: 'DO007KE3UW4VALKKWU4G',
                secretAccessKey: 'gJ9x9vxAlZr8BQbNqpw0eUpcUqTDzipaTZb4UQ5oI0Q'
            }
        });
    }
    async Addimage(file) {
        const bucket = this.ConfigService.get('DO_BUCKET_NAME');
        const key = file.originalname;
        const input = {
            Body: file.buffer,
            Bucket: bucket,
            Key: key,
            ACL: 'public-read',
            ContentType: file.mimetype
        };
        try {
            const response = await this.s3.send(new client_s3_1.PutObjectCommand(input));
            if (response.$metadata.httpStatusCode === 200) {
                return `https://${bucket}.${this.region}.cdn.digitaloceanspaces.com/${key}`;
            }
            throw new Error("image not save in digital ocean s3");
        }
        catch (err) {
            this.logger.error("cannot save file inside s3 spacebucket", err);
            throw err;
        }
    }
    async updateImage(Id, file) {
        const tourpackage = await this.TourpackageRepo.findOneBy({ Id });
        const bucket = this.ConfigService.get('DO_BUCKET_NAME');
        if (tourpackage.coverimageurl) {
            const coverimageurl = tourpackage.coverimageurl.split('/').pop();
            await this.s3.send(new client_s3_1.DeleteObjectCommand({
                Bucket: bucket,
                Key: coverimageurl
            }));
        }
        const key = file.originalname;
        try {
            const response = await this.s3.send(new client_s3_1.PutObjectCommand({
                Body: file.buffer,
                Bucket: bucket,
                Key: key,
                ACL: 'public-read',
                ContentType: file.mimetype
            }));
            if (response.$metadata.httpStatusCode === 200) {
                return `https://${bucket}.${this.region}.cdn.digitaloceanspaces.com/${key}`;
            }
            throw new Error("image not update in digital ocean s3");
        }
        catch (err) {
            this.logger.error("cannot save file inside s3 spacebucket", err);
            throw err;
        }
    }
    async updateAlbumImage(Id, AlbumId, file) {
        const tourpackage = await this.TourpackageRepo.findOneBy({ Id });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const albummage = await this.AlbumimageRepo.findOneBy({ AlbumId });
        if (!albummage) {
            throw new common_1.HttpException(`albummage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const bucket = this.ConfigService.get('DO_BUCKET_NAME');
        if (albummage.albumImageUrl) {
            const albumImageUrl = albummage.albumImageUrl.split('/').pop();
            await this.s3.send(new client_s3_1.DeleteObjectCommand({
                Bucket: bucket,
                Key: albumImageUrl
            }));
        }
        const key = file.originalname;
        try {
            const response = await this.s3.send(new client_s3_1.PutObjectCommand({
                Body: file.buffer,
                Bucket: bucket,
                Key: key,
                ACL: 'public-read',
                ContentType: file.mimetype
            }));
            if (response.$metadata.httpStatusCode === 200) {
                return `https://${bucket}.${this.region}.cdn.digitaloceanspaces.com/${key}`;
            }
            throw new Error("image not update in digital ocean s3");
        }
        catch (err) {
            this.logger.error("cannot save file inside s3 spacebucket", err);
            throw err;
        }
    }
    async updateMainImage(Id, mainimgId, file) {
        const tourpackage = await this.TourpackageRepo.findOneBy({ Id });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const mainImage = await this.MainImageeRepo.findOneBy({ mainimgId });
        if (!mainImage) {
            throw new common_1.HttpException(`mainImage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const bucket = this.ConfigService.get('DO_BUCKET_NAME');
        if (mainImage.MainImageUrl) {
            const MainImageUrl = mainImage.MainImageUrl.split('/').pop();
            await this.s3.send(new client_s3_1.DeleteObjectCommand({
                Bucket: bucket,
                Key: MainImageUrl
            }));
        }
        const key = file.originalname;
        try {
            const response = await this.s3.send(new client_s3_1.PutObjectCommand({
                Body: file.buffer,
                Bucket: bucket,
                Key: key,
                ACL: 'public-read',
                ContentType: file.mimetype
            }));
            if (response.$metadata.httpStatusCode === 200) {
                return `https://${bucket}.${this.region}.cdn.digitaloceanspaces.com/${key}`;
            }
            throw new Error("image not update in digital ocean s3");
        }
        catch (err) {
            this.logger.error("cannot save file inside s3 spacebucket", err);
            throw err;
        }
    }
    async updatevisitedImage(Id, VimageId, file) {
        const tourpackage = await this.TourpackageRepo.findOneBy({ Id });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const VisitedImage = await this.VisitedPlaceRepo.findOneBy({ VimageId });
        if (!VisitedImage) {
            throw new common_1.HttpException(`VisitedImage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const bucket = this.ConfigService.get('DO_BUCKET_NAME');
        if (VisitedImage.VisitedImagePath) {
            const VisitedImagePath = VisitedImage.VisitedImagePath.split('/').pop();
            await this.s3.send(new client_s3_1.DeleteObjectCommand({
                Bucket: bucket,
                Key: VisitedImagePath
            }));
        }
        const key = file.originalname;
        try {
            const response = await this.s3.send(new client_s3_1.PutObjectCommand({
                Body: file.buffer,
                Bucket: bucket,
                Key: key,
                ACL: 'public-read',
                ContentType: file.mimetype
            }));
            if (response.$metadata.httpStatusCode === 200) {
                return `https://${bucket}.${this.region}.cdn.digitaloceanspaces.com/${key}`;
            }
            throw new Error("image not update in digital ocean s3");
        }
        catch (err) {
            this.logger.error("cannot save file inside s3 spacebucket", err);
            throw err;
        }
    }
};
S3Service = S3Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tourpackage_entity_1.Tourpackage)),
    __param(1, (0, typeorm_1.InjectRepository)(albumimage_entity_1.AlbumImage)),
    __param(2, (0, typeorm_1.InjectRepository)(mainimage_entity_1.MainImage)),
    __param(3, (0, typeorm_1.InjectRepository)(visitedplace_entity_1.VisitedPlace)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        config_1.ConfigService])
], S3Service);
exports.S3Service = S3Service;
//# sourceMappingURL=s3.service.js.map