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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourpackageController = void 0;
const common_1 = require("@nestjs/common");
const tourpackage_service_1 = require("./tourpackage.service");
const update_tourpackage_dto_1 = require("./dto/update-tourpackage.dto");
const platform_express_1 = require("@nestjs/platform-express");
const tourpackage_entity_1 = require("./entities/tourpackage.entity");
const typeorm_1 = require("typeorm");
const albumimage_entity_1 = require("./entities/albumimage.entity");
const visitedplace_entity_1 = require("./entities/visitedplace.entity");
const update_bookingpolicy_dto_1 = require("./dto/update-bookingpolicy.dto");
const update_refundpolicy_dto_1 = require("./dto/update-refundpolicy.dto");
const update_packageincluion_dto_1 = require("./dto/update-packageincluion.dto");
const update_tourpackageplan_dto_1 = require("./dto/update-tourpackageplan.dto");
const update_packageexclsuions_dto_1 = require("./dto/update-packageexclsuions.dto");
const update_packagehighlightdto_1 = require("./dto/update-packagehighlightdto");
const mainimage_entity_1 = require("./entities/mainimage.entity");
const typeorm_2 = require("@nestjs/typeorm");
const s3_service_1 = require("../s3/s3.service");
const update_installmentDto_1 = require("./dto/update-installmentDto");
let TourpackageController = class TourpackageController {
    constructor(TourpackageRepo, MainImageRepo, AlbumimageRepo, visitedplaceRepo, tourpackageService, s3service) {
        this.TourpackageRepo = TourpackageRepo;
        this.MainImageRepo = MainImageRepo;
        this.AlbumimageRepo = AlbumimageRepo;
        this.visitedplaceRepo = visitedplaceRepo;
        this.tourpackageService = tourpackageService;
        this.s3service = s3service;
    }
    async AddTravelPAckage(file, req, body, res) {
        const coverimageurl = await this.s3service.Addimage(file);
        const tourpackage = new tourpackage_entity_1.Tourpackage();
        tourpackage.coverimageurl = coverimageurl;
        tourpackage.MainTitle = req.body.MainTitle;
        tourpackage.SubTitle = req.body.SubTitle;
        tourpackage.Price = req.body.Price;
        tourpackage.City = req.body.City;
        tourpackage.Discount = req.body.Discount;
        tourpackage.Location = req.body.Location;
        tourpackage.Availability = req.body.Availability;
        tourpackage.StartDate = req.body.StartDate;
        tourpackage.EndDate = req.body.EndDate;
        tourpackage.TripType = req.body.TripType;
        tourpackage.TotalDuration = req.body.TotalDuration;
        tourpackage.PackageOverview = req.body.PackageOverview;
        tourpackage.Showpackage = req.body.Showpackage;
        tourpackage.Flight = req.body.Flight;
        tourpackage.Transport = req.body.Transport;
        tourpackage.Food = req.body.Food;
        tourpackage.Hotel = req.body.Hotel;
        tourpackage.Code = req.body.Code;
        await this.TourpackageRepo.save(tourpackage);
        return res.status(common_1.HttpStatus.OK).send({ status: "success", message: "Travel package added succesfully", });
    }
    async FindAll(req, res) {
        const Alltourpackage = await this.tourpackageService.FindAllPackages();
        return res.status(common_1.HttpStatus.OK).json({ Alltourpackage });
    }
    findOne(id) {
        const gettourpackage = this.tourpackageService.findOne(+id);
        if (!gettourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return gettourpackage;
    }
    findOneBytriptype(TripType) {
        return this.tourpackageService.getCityByTripType(TripType);
    }
    async getTourPackages(TripType, City, StartDate) {
        return this.tourpackageService.GetTourpackageByDiffirentfield(TripType, City, StartDate);
    }
    async update(id, req, res, body, updateTourpackageDto) {
        const updatepackage = await this.tourpackageService.updatePackage(+id, updateTourpackageDto);
        if (!updatepackage) {
            throw new common_1.HttpException(`TourPackage not found with this = ${id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return res.status(common_1.HttpStatus.OK).json({
            status: "success",
            message: `Tour Package  has updated successfully`,
        });
    }
    async updateImageUrl(file, Id, bodyParser, req, res) {
        const imageurl = await this.s3service.updateImage(Id, file);
        const tourpackage = new tourpackage_entity_1.Tourpackage();
        tourpackage.coverimageurl = imageurl;
        await this.TourpackageRepo.update({ Id }, Object.assign({}, tourpackage));
        return res.status(common_1.HttpStatus.OK).json({
            status: "success",
            message: `Cover image  has updated successfully`,
        });
    }
    async createInstallment(Id, res, installmentDto) {
        await this.tourpackageService.AddInstallment(Id, installmentDto);
        return res.status(common_1.HttpStatus.OK).send({ status: "success", message: "Travel package installment added succesfully", });
    }
    async GetInstallment(id, InstallmentId, req, res) {
        const installment = await this.tourpackageService.FindInstallment(id, InstallmentId);
        return res.status(common_1.HttpStatus.OK).json({
            status: "success", installment
        });
    }
    async updateInstallment(id, InstallmentId, updateinstall, req, res) {
        await this.tourpackageService.updateInstallment(id, InstallmentId, updateinstall);
        return res.status(common_1.HttpStatus.OK).json({
            status: "success",
            message: `installment updated successfully`,
        });
    }
    async DeleteInstallment(id, InstallmentId, req, res) {
        await this.tourpackageService.DeleteInstallment(id, InstallmentId);
        return res.status(common_1.HttpStatus.OK).json({
            status: "success",
            message: `Installment has deleted successfully`,
        });
    }
    async remove(id, req, res) {
        await this.tourpackageService.remove(+id);
        return res.status(common_1.HttpStatus.OK).send({ status: "success", message: "Travel package deleted succesfully" });
    }
    async AddmainImages(files, Id, req, res, body) {
        const tourpackage = await this.TourpackageRepo.findOneBy({ Id });
        if (!tourpackage) {
            throw new common_1.HttpException("TourPackage not found, cann't add main image", common_1.HttpStatus.BAD_REQUEST);
        }
        for (const file of files) {
            const coverimageurl = await this.s3service.Addimage(file);
            const mainimage = new mainimage_entity_1.MainImage();
            mainimage.MainImageUrl = coverimageurl;
            mainimage.MainImageTitle = req.body.MainImageTitle;
            await this.MainImageRepo.save(Object.assign(Object.assign({}, mainimage), { tourpackage }));
        }
        return res.status(common_1.HttpStatus.OK).send({
            status: "success",
            message: "main Image Added Successfully"
        });
    }
    addTourPackageBookingPolicy(id, bookingpolicydto, req, res) {
        this.tourpackageService.createbookingPolicy(id, bookingpolicydto);
        return res.status(common_1.HttpStatus.OK).json({
            status: "success",
            message: 'booking policy added',
        });
    }
    async getsingleBookingPolicy(id, BkId, req, res) {
        const bookingpolicy = await this.tourpackageService.FindbookingPolicy(id, BkId);
        return res.status(common_1.HttpStatus.OK).json({
            status: "success", bookingpolicy
        });
    }
    async updateBookingPolicy(id, BkId, updatebookingpolicyDto, req, res) {
        const updatebooking = await this.tourpackageService.updateBookingolicy(id, BkId, updatebookingpolicyDto);
        return res.status(common_1.HttpStatus.OK).json({
            status: "success",
            message: `Booking policy updated successfully`,
        });
    }
    async DeleteBookingPolicy(id, BkId, req, res) {
        await this.tourpackageService.DeletebookingPolicy(id, BkId);
        return res.status(common_1.HttpStatus.OK).json({
            status: "success",
            message: `booking policy deleted successfully`,
        });
    }
    async addrefundPolicy(id, refundpolicydto, req, res) {
        await this.tourpackageService.AddRefundPolicy(id, refundpolicydto);
        return res.status(common_1.HttpStatus.OK).json({
            status: "success",
            message: 'refund policy added',
        });
    }
    async getsinglerefundPolicy(id, RId, req, res) {
        const refundpolicy = await this.tourpackageService.FindRefundPolicy(id, RId);
        return res.status(common_1.HttpStatus.OK).json({ refundpolicy });
    }
    async updateRefundPolicy(id, RId, updateRefundlicyDto, req, res) {
        const updaterefund = await this.tourpackageService.updateRefundolicy(id, RId, updateRefundlicyDto);
        return res.status(common_1.HttpStatus.OK).json({
            status: "success",
        });
    }
    async DeleteRefundPolicy(id, RId, req, res) {
        await this.tourpackageService.DeleterefundPolicy(id, RId);
        return res.status(common_1.HttpStatus.OK).json({
            status: "success",
            message: `refund policy Id=${RId} has deleted successfully`,
        });
    }
    async addInclusion(id, Inclusionsdto, req, res) {
        await this.tourpackageService.AddInclusions(id, Inclusionsdto);
        return res.status(common_1.HttpStatus.OK).json({
            status: "success",
            message: 'travel package Inlclusions Iteam Added',
        });
    }
    async getsingleInclsuions(id, InId, req, res) {
        const inclsuions = await this.tourpackageService.FindInclsuions(id, InId);
        return res.status(common_1.HttpStatus.OK).json({
            inclsuions
        });
    }
    async updateInclsuions(id, InId, updateInclusionsDto, req, res) {
        const updateInclsuions = await this.tourpackageService.updateInclusions(id, InId, updateInclusionsDto);
        return res.status(common_1.HttpStatus.OK).json({
            status: "success",
            message: `Inclsuions with Id=${InId} has updated successfully`,
            updateInclsuions,
        });
    }
    async DeleteExcluions(id, InId, req, res) {
        await this.tourpackageService.DeleteInclusion(id, InId);
        return res.status(common_1.HttpStatus.OK).json({
            status: "success",
            message: `Inclusion has deleted successfully`,
        });
    }
    async getAllBumImage(id, AlbumTitle, req, res) {
        const Albumimages = await this.tourpackageService.FindAlbum(id, AlbumTitle);
        return res.status(common_1.HttpStatus.OK).json({
            Albumimages,
        });
    }
    async updateAlbumImageUrl(files, Id, AlbumId, bodyParser, req, res) {
        for (const file of files) {
            const albumImageUrl = await this.s3service.updateAlbumImage(Id, AlbumId, file);
            const albumImage = new albumimage_entity_1.AlbumImage();
            albumImage.albumImageUrl = albumImageUrl;
            await this.AlbumimageRepo.update(AlbumId, albumImage);
        }
        return res.status(common_1.HttpStatus.OK).json({
            status: "success",
            message: `Album Image has updated successfully`,
        });
    }
    async updateMainImageUrl(files, Id, mainimgId, bodyParser, req, res) {
        for (const file of files) {
            const mainImageUrl = await this.s3service.updateAlbumImage(Id, mainimgId, file);
            const mainImage = new mainimage_entity_1.MainImage();
            mainImage.MainImageUrl = mainImageUrl;
            await this.MainImageRepo.update(mainimgId, mainImage);
        }
        return res.status(common_1.HttpStatus.OK).json({
            status: "success",
            message: `mainImage has updated successfully`,
        });
    }
    async updateVistedImageUrl(files, Id, VimageId, bodyParser, req, res) {
        for (const file of files) {
            const ImageUrl = await this.s3service.updatevisitedImage(Id, VimageId, file);
            const visitedimage = new visitedplace_entity_1.VisitedPlace();
            visitedimage.VisitedImagePath = ImageUrl;
            await this.visitedplaceRepo.update(VimageId, visitedimage);
        }
        return res.status(common_1.HttpStatus.OK).json({
            status: "success",
            message: `visitedimage has updated successfully`,
        });
    }
    async getAllAlbumImage(id, req, res) {
        const AllAlbumimages = await this.tourpackageService.FindAllAlbum(id);
        return res.status(common_1.HttpStatus.OK).json({
            AllAlbumimages,
        });
    }
    async getAllmainImage(id, req, res) {
        const AllMainImage = await this.tourpackageService.AllMainImage(id);
        return res.status(common_1.HttpStatus.OK).json({
            AllMainImage,
        });
    }
    async AddalbumImages(files, Id, req, res, body) {
        const tourpackage = await this.TourpackageRepo.findOneBy({ Id });
        if (!tourpackage) {
            throw new common_1.HttpException("TourPackage not found, cann't add cover image", common_1.HttpStatus.BAD_REQUEST);
        }
        for (const file of files) {
            const albumImageUrl = await this.s3service.Addimage(file);
            const newalbum = new albumimage_entity_1.AlbumImage();
            newalbum.albumImageUrl = albumImageUrl;
            newalbum.AlbumTitle = req.body.AlbumTitle;
            await this.AlbumimageRepo.save(Object.assign(Object.assign({}, newalbum), { tourpackage }));
        }
        return res.status(common_1.HttpStatus.OK).send({
            status: "success",
            message: "album Image Added Successfully"
        });
    }
    async AddvistitedImages(files, Id, req, res, body) {
        const tourpackage = await this.TourpackageRepo.findOneBy({ Id });
        if (!tourpackage) {
            throw new common_1.HttpException("TourPackage not found, cann't add cover image", common_1.HttpStatus.BAD_REQUEST);
        }
        for (const file of files) {
            const VisitedImagePath = await this.s3service.Addimage(file);
            const newalbum = new visitedplace_entity_1.VisitedPlace();
            newalbum.VisitedImagePath = VisitedImagePath;
            newalbum.PlaceName = req.body.PlaceName;
            await this.visitedplaceRepo.save(Object.assign(Object.assign({}, newalbum), { tourpackage }));
        }
        return res.status(common_1.HttpStatus.OK).send({ status: "success", message: "visited Image Added Successfully", Tourpackage: tourpackage_entity_1.Tourpackage });
    }
    async getAllvisitedImage(id, req, res) {
        const visitedImage = await this.tourpackageService.FindAllvisitedImage(id);
        return res.status(common_1.HttpStatus.OK).json({
            visitedImage
        });
    }
    addTourPackagePlan(id, tourpackagePlandto, req, res) {
        const tourpackageplan = this.tourpackageService.AddTourpackagePlan(id, tourpackagePlandto);
        return res.status(common_1.HttpStatus.OK).json({
            status: "success",
            message: 'travel package plan added Iteam Added',
        });
    }
    async getdayplan(id, dayId, req, res) {
        const tourplan = await this.tourpackageService.Finddayplan(id, dayId);
        return res.status(common_1.HttpStatus.OK).json({ tourplan });
    }
    async updatePackageplan(id, dayId, updatedayplanDto, req, res) {
        const updatedayplan = await this.tourpackageService.updatedayplan(id, dayId, updatedayplanDto);
        return res.status(common_1.HttpStatus.OK).json({
            status: "success",
            message: `dayplan with Id=${dayId} has updated successfully`,
            updatedayplan,
        });
    }
    async DeleteDay(id, dayId, req, res) {
        await this.tourpackageService.DeleteIdayplan(id, dayId);
        return res.status(common_1.HttpStatus.OK).json({
            message: `dayplan Id=${dayId} has deleted successfully`,
        });
    }
    async addTourPackageExclusions(id, packageexcluionsdto, req, res) {
        const exclsuions = await this.tourpackageService.AddpackageExclsuions(id, packageexcluionsdto);
        return res.status(common_1.HttpStatus.OK).send({
            status: "success", message: "exlusions  Added Successfully",
        });
    }
    async getPackageExclsuions(id, ExId, req, res) {
        const exclsuions = await this.tourpackageService.FindExclsuions(id, ExId);
        return res.status(common_1.HttpStatus.OK).json({
            exclsuions
        });
    }
    async updateExlsuions(id, ExId, updateExclusionsDto, req, res) {
        const updateexlsuions = await this.tourpackageService.updateExclusions(id, ExId, updateExclusionsDto);
        return res.status(common_1.HttpStatus.OK).json({
            message: `Exclsuions with Id=${ExId} has updated successfully`,
            updateexlsuions,
        });
    }
    async DeleteIncluions(id, ExId, req, res) {
        await this.tourpackageService.DeleteIExclusion(id, ExId);
        return res.status(common_1.HttpStatus.OK).json({
            message: `Exclusion Id=${ExId} has deleted successfully`,
        });
    }
    addTourPackageHighlight(id, packageHighlightdto, req, res) {
        const tourpackagehighlight = this.tourpackageService.AddPackageHighlight(id, packageHighlightdto);
        return res.status(common_1.HttpStatus.OK).json({
            status: "success",
            message: 'travel package Highlight added'
        });
    }
    async getPackageHighlight(id, HiId, req, res) {
        const Highlight = await this.tourpackageService.FindHighlight(id, HiId);
        return res.status(common_1.HttpStatus.OK).json({
            Highlight
        });
    }
    async updateHiId(id, HiId, updatehighlightDto, req, res) {
        const updateHighlight = await this.tourpackageService.updateHighlight(id, HiId, updatehighlightDto);
        return res.status(common_1.HttpStatus.OK).json({
            status: "success",
            message: `Highlight with Id ${HiId} has updated successfully`
        });
    }
    async DeleteHighlight(id, HiId, req, res) {
        await this.tourpackageService.DeleteHighlight(id, HiId);
        return res.status(common_1.HttpStatus.OK).json({
            message: `Highlight Id ${HiId} has deleted successfully`,
        });
    }
};
__decorate([
    (0, common_1.Post)('Addpackage'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('coverimageurl')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "AddTravelPAckage", null);
__decorate([
    (0, common_1.Get)('AllPackage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "FindAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TourpackageController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/location/:TripType'),
    __param(0, (0, common_1.Param)('TripType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "findOneBytriptype", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)('TripType')),
    __param(1, (0, common_1.Query)('City')),
    __param(2, (0, common_1.Query)('StartDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "getTourPackages", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object, Object, update_tourpackage_dto_1.UpdateTourpackageDto]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('updateimage/:Id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('coverimageurl')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('Id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Req)()),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "updateImageUrl", null);
__decorate([
    (0, common_1.Post)(':Id/addinstallment'),
    __param(0, (0, common_1.Param)('Id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Array]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "createInstallment", null);
__decorate([
    (0, common_1.Get)(':id/getinstallment/:InstallmentId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('InstallmentId')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "GetInstallment", null);
__decorate([
    (0, common_1.Patch)(':id/updateinstallment/:InstallmentId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('InstallmentId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Req)()),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, update_installmentDto_1.updateinstallmentdto, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "updateInstallment", null);
__decorate([
    (0, common_1.Delete)(':id/Installment/:InstallmentId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('InstallmentId')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "DeleteInstallment", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':Id/AddmainImage'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('MainImageUrl', 20)),
    __param(0, (0, common_1.UploadedFiles)(new common_1.ParseFilePipeBuilder()
        .addFileTypeValidator({
        fileType: /(jpg|jpeg|png|gif)$/,
    })
        .addMaxSizeValidator({
        maxSize: 1024 * 1024 * 6,
    })
        .build({
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
    }))),
    __param(1, (0, common_1.Param)('Id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __param(4, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "AddmainImages", null);
__decorate([
    (0, common_1.Post)(':id/AddBookingPolicy'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array, Object, Object]),
    __metadata("design:returntype", void 0)
], TourpackageController.prototype, "addTourPackageBookingPolicy", null);
__decorate([
    (0, common_1.Get)(':id/getpolicy/:BkId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('BkId')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "getsingleBookingPolicy", null);
__decorate([
    (0, common_1.Patch)(':id/updatepolicy/:BkId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('BkId')),
    __param(2, (0, common_1.Body)()),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, update_bookingpolicy_dto_1.updateBookingPolicyDto, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "updateBookingPolicy", null);
__decorate([
    (0, common_1.Delete)(':id/deletepolicy/:BkId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('BkId')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "DeleteBookingPolicy", null);
__decorate([
    (0, common_1.Post)(':id/AddrefundPolicy'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "addrefundPolicy", null);
__decorate([
    (0, common_1.Get)(':id/getrefundpolicy/:RId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('RId')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "getsinglerefundPolicy", null);
__decorate([
    (0, common_1.Patch)(':id/updateRefundpolicy/:RId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('RId')),
    __param(2, (0, common_1.Body)()),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, update_refundpolicy_dto_1.UpdateRefundPolicy, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "updateRefundPolicy", null);
__decorate([
    (0, common_1.Delete)(':id/deleteRefundpolicy/:RId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('RId')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "DeleteRefundPolicy", null);
__decorate([
    (0, common_1.Post)(':id/AddPackageInclusions'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "addInclusion", null);
__decorate([
    (0, common_1.Get)(':id/getinclsuions/:InId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('InId')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "getsingleInclsuions", null);
__decorate([
    (0, common_1.Patch)(':id/updateInclsuions/:InId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('InId')),
    __param(2, (0, common_1.Body)()),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, update_packageincluion_dto_1.updatepackageInclusionDto, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "updateInclsuions", null);
__decorate([
    (0, common_1.Delete)(':id/deleteinclusions/:InId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('InId')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "DeleteExcluions", null);
__decorate([
    (0, common_1.Get)(':id/FindAlbum/:AlbumTitle'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('AlbumTitle')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "getAllBumImage", null);
__decorate([
    (0, common_1.Patch)(':Id/albumimage/:AlbumId'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('albumImageUrl', 20)),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Param)('Id')),
    __param(2, (0, common_1.Param)('AlbumId')),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, common_1.Req)()),
    __param(5, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number, Number, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "updateAlbumImageUrl", null);
__decorate([
    (0, common_1.Patch)(':Id/mainimage/:mainimgId'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('MainImageUrl', 20)),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Param)('Id')),
    __param(2, (0, common_1.Param)('mainimgId')),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, common_1.Req)()),
    __param(5, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number, Number, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "updateMainImageUrl", null);
__decorate([
    (0, common_1.Patch)(':Id/visitedimage/:VimageId'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('VisitedImagePath', 20)),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Param)('Id')),
    __param(2, (0, common_1.Param)('VimageId')),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, common_1.Req)()),
    __param(5, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number, Number, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "updateVistedImageUrl", null);
__decorate([
    (0, common_1.Get)(':id/allalbumimage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "getAllAlbumImage", null);
__decorate([
    (0, common_1.Get)(':id/Allmainimage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "getAllmainImage", null);
__decorate([
    (0, common_1.Post)(':Id/AddalbumImage'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('albumImageUrl', 20)),
    __param(0, (0, common_1.UploadedFiles)(new common_1.ParseFilePipeBuilder()
        .addFileTypeValidator({
        fileType: /(jpg|jpeg|png|gif)$/,
    })
        .addMaxSizeValidator({
        maxSize: 1024 * 1024 * 6,
    })
        .build({
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
    }))),
    __param(1, (0, common_1.Param)('Id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __param(4, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "AddalbumImages", null);
__decorate([
    (0, common_1.Post)(':Id/AddvistitedImages'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('VisitedImagePath', 20)),
    __param(0, (0, common_1.UploadedFiles)(new common_1.ParseFilePipeBuilder()
        .addFileTypeValidator({
        fileType: /(jpg|jpeg|png|gif)$/,
    })
        .addMaxSizeValidator({
        maxSize: 1024 * 1024 * 6,
    })
        .build({
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
    }))),
    __param(1, (0, common_1.Param)('Id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __param(4, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "AddvistitedImages", null);
__decorate([
    (0, common_1.Get)(':id/visitedImage/getAllvisitedImage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "getAllvisitedImage", null);
__decorate([
    (0, common_1.Post)(':id/AddTourPackagePlan'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array, Object, Object]),
    __metadata("design:returntype", void 0)
], TourpackageController.prototype, "addTourPackagePlan", null);
__decorate([
    (0, common_1.Get)(':id/tourplan/:dayId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('dayId')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "getdayplan", null);
__decorate([
    (0, common_1.Patch)(':id/updateplan/:dayId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('dayId')),
    __param(2, (0, common_1.Body)()),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, update_tourpackageplan_dto_1.updateTourPackagePlanDto, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "updatePackageplan", null);
__decorate([
    (0, common_1.Delete)(':id/deletedayplan/:dayId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('dayId')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "DeleteDay", null);
__decorate([
    (0, common_1.Post)(':id/AddTourPackageExclusions'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "addTourPackageExclusions", null);
__decorate([
    (0, common_1.Get)(':id/Exclsuions/:ExId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('ExId')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "getPackageExclsuions", null);
__decorate([
    (0, common_1.Patch)(':id/updateExclsuions/:ExId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('ExId')),
    __param(2, (0, common_1.Body)()),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, update_packageexclsuions_dto_1.updatepackageExclusionsDto, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "updateExlsuions", null);
__decorate([
    (0, common_1.Delete)(':id/deleteExclusions/:ExId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('ExId')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "DeleteIncluions", null);
__decorate([
    (0, common_1.Post)(':id/AddTourPackageHighlight'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array, Object, Object]),
    __metadata("design:returntype", void 0)
], TourpackageController.prototype, "addTourPackageHighlight", null);
__decorate([
    (0, common_1.Get)(':id/getHighlight/:HiId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('HiId')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "getPackageHighlight", null);
__decorate([
    (0, common_1.Patch)(':id/updateHighlight/:HiId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('HiId')),
    __param(2, (0, common_1.Body)()),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, update_packagehighlightdto_1.UpdatepackageHighlightDto, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "updateHiId", null);
__decorate([
    (0, common_1.Delete)(':id/DeleteHighlight/:HiId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('HiId')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], TourpackageController.prototype, "DeleteHighlight", null);
TourpackageController = __decorate([
    (0, common_1.Controller)('tourpackage'),
    __param(0, (0, typeorm_2.InjectRepository)(tourpackage_entity_1.Tourpackage)),
    __param(1, (0, typeorm_2.InjectRepository)(mainimage_entity_1.MainImage)),
    __param(2, (0, typeorm_2.InjectRepository)(albumimage_entity_1.AlbumImage)),
    __param(3, (0, typeorm_2.InjectRepository)(visitedplace_entity_1.VisitedPlace)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        tourpackage_service_1.TourpackageService,
        s3_service_1.S3Service])
], TourpackageController);
exports.TourpackageController = TourpackageController;
//# sourceMappingURL=tourpackage.controller.js.map