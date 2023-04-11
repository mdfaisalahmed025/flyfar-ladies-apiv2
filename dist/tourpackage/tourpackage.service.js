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
exports.TourpackageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const albumimage_entity_1 = require("./entities/albumimage.entity");
const bookingpolicy_entity_1 = require("./entities/bookingpolicy.entity");
const mainimage_entity_1 = require("./entities/mainimage.entity");
const packageexclsuions_entity_1 = require("./entities/packageexclsuions.entity");
const packagehighlight_entity_1 = require("./entities/packagehighlight.entity");
const packageInclusion_entitry_1 = require("./entities/packageInclusion.entitry");
const refundpolicy_entity_1 = require("./entities/refundpolicy.entity");
const tourpackage_entity_1 = require("./entities/tourpackage.entity");
const tourpackageplan_entity_1 = require("./entities/tourpackageplan.entity");
const visitedplace_entity_1 = require("./entities/visitedplace.entity");
const installment_entity_1 = require("./entities/installment.entity");
let TourpackageService = class TourpackageService {
    constructor(TourpackageRepo, packageInclusionRepo, tourpackagePlanRepo, packageexcluionsRepo, packageHighlightRepo, bookingPolicyRepo, refundPolicyRepo, InstallmentRepo, AlbumImageRepo, MainImageRepo, visitedImageRepo) {
        this.TourpackageRepo = TourpackageRepo;
        this.packageInclusionRepo = packageInclusionRepo;
        this.tourpackagePlanRepo = tourpackagePlanRepo;
        this.packageexcluionsRepo = packageexcluionsRepo;
        this.packageHighlightRepo = packageHighlightRepo;
        this.bookingPolicyRepo = bookingPolicyRepo;
        this.refundPolicyRepo = refundPolicyRepo;
        this.InstallmentRepo = InstallmentRepo;
        this.AlbumImageRepo = AlbumImageRepo;
        this.MainImageRepo = MainImageRepo;
        this.visitedImageRepo = visitedImageRepo;
    }
    async findOne(Id) {
        const gettourpackage = this.TourpackageRepo.findOne({ where: { Id } });
        return gettourpackage;
    }
    async FindAllPackages() {
        const packages = await this.TourpackageRepo.find({});
        return packages;
    }
    async GetTourpackageByDiffirentfield(TripType, City, StartDate) {
        const [month, year] = StartDate.split(" ");
        const startOfMonth = new Date(`${month} 1, ${year}`);
        const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);
        const queryBuilder = this.TourpackageRepo.createQueryBuilder('tourPackage');
        queryBuilder.leftJoinAndSelect('tourPackage.mainimage', 'mainimage');
        queryBuilder.leftJoinAndSelect('tourPackage.albumImages', 'albumImages');
        queryBuilder.leftJoinAndSelect('tourPackage.vistitedImages', 'vistitedImages');
        queryBuilder.leftJoinAndSelect('tourPackage.PackageInclusions', 'PackageInclusions');
        queryBuilder.leftJoinAndSelect('tourPackage.BookingPolicys', 'BookingPolicys');
        queryBuilder.leftJoinAndSelect('tourPackage.highlights', 'highlights');
        queryBuilder.leftJoinAndSelect('tourPackage.tourpackageplans', 'tourpackageplans');
        queryBuilder.leftJoinAndSelect('tourPackage.refundpolicys', 'refundpolicys');
        queryBuilder.leftJoinAndSelect('tourPackage.installments', 'installments');
        queryBuilder.leftJoinAndSelect('tourPackage.exclusions', 'exclusions');
        queryBuilder.where('tourPackage.TripType = :TripType', { TripType });
        queryBuilder.andWhere('tourPackage.City = :City', { City });
        queryBuilder.andWhere('tourPackage.StartDate >= :startOfMonth', { startOfMonth });
        queryBuilder.andWhere('tourPackage.StartDate <= :endOfMonth', { endOfMonth });
        const tourPackages = await queryBuilder.getMany();
        return tourPackages;
    }
    async getCityByTripType(TripType) {
        const city = await this.TourpackageRepo
            .createQueryBuilder('tourpackage')
            .select('DISTINCT tourpackage.City')
            .where('tourpackage.Triptype = :TripType', { TripType })
            .getRawMany();
        return city.map((City) => ({ name: City.City }));
    }
    async updatePackage(Id, updateTourpackageDto) {
        return await this.TourpackageRepo.update({ Id }, Object.assign({}, updateTourpackageDto));
    }
    async remove(Id) {
        const tourpackage = this.TourpackageRepo.findOne({ where: { Id } });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return this.TourpackageRepo.delete(Id);
    }
    async FindAlbum(Id, AlbumTitle) {
        const tourpackage = await this.TourpackageRepo.findOne({
            where: {
                Id
            }
        });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const AlbumImage = await this.AlbumImageRepo.find({ where: { AlbumTitle } });
        if (!AlbumImage) {
            throw new common_1.HttpException(`Image not found with `, common_1.HttpStatus.BAD_REQUEST);
        }
        return AlbumImage;
    }
    async FindAllAlbum(Id) {
        const tourpackage = await this.TourpackageRepo.findOne({
            where: {
                Id
            }
        });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const AllAlbumImage = await this.AlbumImageRepo.find({});
        if (!AllAlbumImage) {
            throw new common_1.HttpException(`Image not found with `, common_1.HttpStatus.BAD_REQUEST);
        }
        return AllAlbumImage;
    }
    async AllMainImage(Id) {
        const tourpackage = await this.TourpackageRepo.findOne({
            where: {
                Id
            }
        });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const MainImage = await this.MainImageRepo.find({});
        if (!MainImage) {
            throw new common_1.HttpException(`Image not found with `, common_1.HttpStatus.BAD_REQUEST);
        }
        return MainImage;
    }
    async FindAllvisitedImage(Id) {
        const tourpackage = await this.TourpackageRepo.findOne({
            where: {
                Id
            }
        });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const visitedImage = await this.visitedImageRepo.find({});
        if (!albumimage_entity_1.AlbumImage) {
            throw new common_1.HttpException(`Image not found with `, common_1.HttpStatus.BAD_REQUEST);
        }
        return visitedImage;
    }
    async createbookingPolicy(Id, CreateBookingPolicyDto) {
        const tourpackage = await this.TourpackageRepo.findOneBy({ Id });
        if (!tourpackage) {
            throw new common_1.HttpException("TourPackage not found, cann't add booking policy", common_1.HttpStatus.BAD_REQUEST);
        }
        const createdPolicies = [];
        for (const CreatebookingPolicydto of CreateBookingPolicyDto) {
            const creatpolicy = await this.bookingPolicyRepo.create(Object.assign(Object.assign({}, CreatebookingPolicydto), { tourpackage }));
            const createdpolicy = await this.bookingPolicyRepo.save(creatpolicy);
            createdPolicies.push(createdpolicy);
        }
        return createdPolicies;
    }
    async AddInstallment(Id, CreateInstallmentDto) {
        const tourpackage = await this.TourpackageRepo.findOneBy({ Id });
        if (!tourpackage) {
            throw new common_1.HttpException("TourPackage not found", common_1.HttpStatus.BAD_REQUEST);
        }
        const createinstallment = [];
        for (const createinstallmentdto of CreateInstallmentDto) {
            const installment = await this.InstallmentRepo.create(Object.assign(Object.assign({}, createinstallmentdto), { tourpackage }));
            const createdinstallment = await this.InstallmentRepo.save(installment);
            createinstallment.push(createdinstallment);
        }
        return createinstallment;
    }
    async FindInstallment(Id, InstallmentId) {
        const tourpackage = await this.TourpackageRepo.findOne({
            where: {
                Id
            }
        });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const installment = await this.InstallmentRepo.findOne({ where: { InstallmentId } });
        if (!installment) {
            throw new common_1.HttpException(`installment not found with this id=${InstallmentId}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return installment;
    }
    async updateInstallment(Id, InstallmentId, updateinstall) {
        const tourpackage = await this.TourpackageRepo.findOne({
            where: {
                Id
            }
        });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const bookingpolicy = await this.InstallmentRepo.findOne({ where: { InstallmentId } });
        if (!bookingpolicy) {
            throw new common_1.HttpException(`installment not found with this id=${InstallmentId}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const updatepolicy = await this.InstallmentRepo.update({ InstallmentId }, Object.assign({}, updateinstall));
        return updatepolicy;
    }
    async DeleteInstallment(Id, InstallmentId) {
        const tourpackage = await this.TourpackageRepo.findOne({
            where: {
                Id
            }
        });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const bookingpolicy = await this.InstallmentRepo.findOne({ where: { InstallmentId } });
        if (!bookingpolicy) {
            throw new common_1.HttpException(`Installment not found with this id=${InstallmentId}`, common_1.HttpStatus.BAD_REQUEST);
        }
        await this.InstallmentRepo.delete(InstallmentId);
    }
    async FindbookingPolicy(Id, BkId) {
        const tourpackage = await this.TourpackageRepo.findOne({
            where: {
                Id
            }
        });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const bookingpolicy = await this.bookingPolicyRepo.findOne({ where: { BkId } });
        if (!bookingpolicy) {
            throw new common_1.HttpException(`booking policy not found with this id=${BkId}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return bookingpolicy;
    }
    async updateBookingolicy(Id, BkId, updateBOokingPolicy) {
        const tourpackage = await this.TourpackageRepo.findOne({
            where: {
                Id
            }
        });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const bookingpolicy = await this.bookingPolicyRepo.findOne({ where: { BkId } });
        if (!bookingpolicy) {
            throw new common_1.HttpException(`booking policy not found with this id=${BkId}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const updatepolicy = await this.bookingPolicyRepo.update({ BkId }, Object.assign({}, updateBOokingPolicy));
        return updatepolicy;
    }
    async DeletebookingPolicy(Id, BkId) {
        const tourpackage = await this.TourpackageRepo.findOne({
            where: {
                Id
            }
        });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const bookingpolicy = await this.bookingPolicyRepo.findOne({ where: { BkId } });
        if (!bookingpolicy) {
            throw new common_1.HttpException(`booking policy not found with this id=${BkId}`, common_1.HttpStatus.BAD_REQUEST);
        }
        await this.bookingPolicyRepo.delete(BkId);
    }
    async AddRefundPolicy(Id, RefundpolicyDto) {
        const tourpackage = await this.TourpackageRepo.findOneBy({ Id });
        if (!tourpackage) {
            throw new common_1.HttpException("TourPackage not found, cann't add cover image", common_1.HttpStatus.BAD_REQUEST);
        }
        const refundpolic = [];
        for (const refundpolicydto of RefundpolicyDto) {
            const createrefundpolicy = this.refundPolicyRepo.create(Object.assign(Object.assign({}, refundpolicydto), { tourpackage }));
            const createdrefundpolicy = await this.refundPolicyRepo.save(createrefundpolicy);
            refundpolic.push(createdrefundpolicy);
        }
        return refundpolic;
    }
    async FindRefundPolicy(Id, RId) {
        const tourpackage = await this.TourpackageRepo.findOne({
            where: {
                Id
            }
        });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const refundpolicy = await this.refundPolicyRepo.findOne({ where: { RId } });
        if (!refundpolicy) {
            throw new common_1.HttpException(`refund policy not found with this id=${RId}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return refundpolicy;
    }
    async updateRefundolicy(Id, RId, updaterefundPolicy) {
        const tourpackage = await this.TourpackageRepo.findOne({
            where: {
                Id
            }
        });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const bookingpolicy = await this.refundPolicyRepo.findOne({ where: { RId } });
        if (!bookingpolicy) {
            throw new common_1.HttpException(`Refund policy not found with this id=${RId}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const updatepolicy = await this.refundPolicyRepo.update({ RId }, Object.assign({}, updaterefundPolicy));
        return updatepolicy;
    }
    async DeleterefundPolicy(Id, RId) {
        const tourpackage = await this.TourpackageRepo.findOne({
            where: {
                Id
            }
        });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const Refundpolicy = await this.refundPolicyRepo.findOne({ where: { RId } });
        if (!Refundpolicy) {
            throw new common_1.HttpException(`Refund policy not found with this id=${RId}`, common_1.HttpStatus.BAD_REQUEST);
        }
        await this.refundPolicyRepo.delete(RId);
    }
    async AddInclusions(Id, inclusionsDto) {
        const tourpackage = await this.TourpackageRepo.findOneBy({ Id });
        if (!tourpackage) {
            throw new common_1.HttpException("TourPackage not found, cann't add cover image", common_1.HttpStatus.BAD_REQUEST);
        }
        const inclsuinsarray = [];
        for (const inclusionsdto of inclusionsDto) {
            const newInclusions = await this.packageInclusionRepo.create(Object.assign(Object.assign({}, inclusionsdto), { tourpackage }));
            const saveinclusions = await this.packageInclusionRepo.save(newInclusions);
            inclsuinsarray.push(saveinclusions);
        }
        return inclsuinsarray;
    }
    async FindInclsuions(Id, InId) {
        const tourpackage = await this.TourpackageRepo.findOne({
            where: {
                Id
            }
        });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const inclusions = await this.packageInclusionRepo.findOne({ where: { InId } });
        if (!inclusions) {
            throw new common_1.HttpException(`Inclusions not found with this id=${InId}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return inclusions;
    }
    async updateInclusions(Id, InId, updateInclusionsDto) {
        const tourpackage = await this.TourpackageRepo.findOne({
            where: {
                Id
            }
        });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const inclsuions = await this.packageInclusionRepo.findOne({ where: { InId } });
        if (!inclsuions) {
            throw new common_1.HttpException(`inclusions not found with this id=${InId}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const updateinclusion = await this.packageInclusionRepo.update({ InId }, Object.assign({}, updateInclusionsDto));
        return updateinclusion;
    }
    async DeleteInclusion(Id, InId) {
        const tourpackage = await this.TourpackageRepo.findOne({
            where: {
                Id
            }
        });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const inclusions = await this.packageInclusionRepo.findOne({ where: { InId } });
        if (!inclusions) {
            throw new common_1.HttpException(`Inclsuions not found with this id=${InId}`, common_1.HttpStatus.BAD_REQUEST);
        }
        await this.packageInclusionRepo.delete(InId);
    }
    async AddpackageExclsuions(Id, exclusionDto) {
        const tourpackage = await this.TourpackageRepo.findOneBy({ Id });
        if (!tourpackage) {
            throw new common_1.HttpException("TourPackage not found, cann't add cover image", common_1.HttpStatus.BAD_REQUEST);
        }
        const exclsuinsarray = [];
        for (const exclusiondto of exclusionDto) {
            const newExclsuions = await this.packageexcluionsRepo.create(Object.assign(Object.assign({}, exclusiondto), { tourpackage }));
            const saveexclsuions = await this.packageexcluionsRepo.save(newExclsuions);
            exclsuinsarray.push(saveexclsuions);
        }
        return exclsuinsarray;
    }
    async FindExclsuions(Id, ExId) {
        const tourpackage = await this.TourpackageRepo.findOne({
            where: {
                Id
            }
        });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const Exclusions = await this.packageexcluionsRepo.findOne({ where: { ExId } });
        if (!Exclusions) {
            throw new common_1.HttpException(`Exclusions not found with this id=${ExId}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return Exclusions;
    }
    async updateExclusions(Id, ExId, updateExlusionsDto) {
        const tourpackage = await this.TourpackageRepo.findOne({
            where: {
                Id
            }
        });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const exclsuions = await this.packageexcluionsRepo.findOne({ where: { ExId } });
        if (!exclsuions) {
            throw new common_1.HttpException(`exclsuions not found with this id=${ExId}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const updateExclsuions = await this.packageexcluionsRepo.update({ ExId }, Object.assign({}, updateExlusionsDto));
        return updateExclsuions;
    }
    async DeleteIExclusion(Id, ExId) {
        const tourpackage = await this.TourpackageRepo.findOne({
            where: {
                Id
            }
        });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const exclusions = await this.packageexcluionsRepo.findOne({ where: { ExId } });
        if (!exclusions) {
            throw new common_1.HttpException(`exclusions not found with this id=${ExId}`, common_1.HttpStatus.BAD_REQUEST);
        }
        await this.packageexcluionsRepo.delete(ExId);
    }
    async AddTourpackagePlan(Id, tourPackageplanDto) {
        const tourpackage = await this.TourpackageRepo.findOneBy({ Id });
        if (!tourpackage) {
            throw new common_1.HttpException("TourPackage not found, cann't add tourplan", common_1.HttpStatus.BAD_REQUEST);
        }
        const createtourplan = [];
        for (const tourpackageplandto of tourPackageplanDto) {
            const newTourplan = await this.tourpackagePlanRepo.create(Object.assign(Object.assign({}, tourpackageplandto), { tourpackage }));
            const savetourplan = await this.tourpackagePlanRepo.save(newTourplan);
            createtourplan.push(savetourplan);
        }
        return createtourplan;
    }
    async Finddayplan(Id, dayId) {
        const tourpackage = await this.TourpackageRepo.findOne({
            where: {
                Id
            }
        });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const dayplan = await this.tourpackagePlanRepo.findOne({ where: { dayId } });
        if (!dayplan) {
            throw new common_1.HttpException(`tour plan not found not found with this id=${dayId}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return dayplan;
    }
    async updatedayplan(Id, dayId, updatedayplanDto) {
        const tourpackage = await this.TourpackageRepo.findOne({
            where: {
                Id
            }
        });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const dayplan = await this.tourpackagePlanRepo.findOne({ where: { dayId } });
        if (!dayplan) {
            throw new common_1.HttpException(`day plan not found with this id=${dayId}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const uodatedayplan = await this.tourpackagePlanRepo.update({ dayId }, Object.assign({}, updatedayplanDto));
        return uodatedayplan;
    }
    async DeleteIdayplan(Id, dayId) {
        const tourpackage = await this.TourpackageRepo.findOne({
            where: {
                Id
            }
        });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const dayplan = await this.tourpackagePlanRepo.findOne({ where: { dayId } });
        if (!dayplan) {
            throw new common_1.HttpException(`Inclsuions not found with this id=${dayId}`, common_1.HttpStatus.BAD_REQUEST);
        }
        await this.tourpackagePlanRepo.delete(dayId);
    }
    async AddPackageHighlight(Id, packageHighlightDto) {
        const tourpackage = await this.TourpackageRepo.findOneBy({ Id });
        if (!tourpackage) {
            throw new common_1.HttpException("TourPackage not found, cann't add cover image", common_1.HttpStatus.BAD_REQUEST);
        }
        const createHightlight = [];
        for (const packagehighlightdto of packageHighlightDto) {
            const newHightlight = await this.packageHighlightRepo.create(Object.assign(Object.assign({}, packagehighlightdto), { tourpackage }));
            const saveHightlight = await this.packageHighlightRepo.save(newHightlight);
            createHightlight.push(saveHightlight);
        }
        return createHightlight;
    }
    async FindHighlight(Id, HiId) {
        const tourpackage = await this.TourpackageRepo.findOne({
            where: {
                Id
            }
        });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const Highlight = await this.packageHighlightRepo.findOne({ where: { HiId } });
        if (!Highlight) {
            throw new common_1.HttpException(`Package highlight not found with this id ${HiId}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return Highlight;
    }
    async updateHighlight(Id, HiId, updateHighlightDto) {
        const tourpackage = await this.TourpackageRepo.findOne({
            where: {
                Id
            }
        });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const highlight = await this.packageHighlightRepo.findOne({ where: { HiId } });
        if (!highlight) {
            throw new common_1.HttpException(`Package highlight found with this id=${HiId}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const updatedhighlight = await this.packageHighlightRepo.update({ HiId }, Object.assign({}, updateHighlightDto));
        return updatedhighlight;
    }
    async DeleteHighlight(Id, HiId) {
        const tourpackage = await this.TourpackageRepo.findOne({
            where: {
                Id
            }
        });
        if (!tourpackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const highlight = await this.packageHighlightRepo.findOne({ where: { HiId } });
        if (!highlight) {
            throw new common_1.HttpException(`Package highlight not found with this id=${HiId}`, common_1.HttpStatus.BAD_REQUEST);
        }
        await this.packageHighlightRepo.delete(HiId);
    }
};
TourpackageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tourpackage_entity_1.Tourpackage)),
    __param(1, (0, typeorm_1.InjectRepository)(packageInclusion_entitry_1.Packageinclusion)),
    __param(2, (0, typeorm_1.InjectRepository)(tourpackageplan_entity_1.tourpackageplan)),
    __param(3, (0, typeorm_1.InjectRepository)(packageexclsuions_entity_1.packageexcluions)),
    __param(4, (0, typeorm_1.InjectRepository)(packagehighlight_entity_1.packagehighlight)),
    __param(5, (0, typeorm_1.InjectRepository)(bookingpolicy_entity_1.bookingpolicy)),
    __param(6, (0, typeorm_1.InjectRepository)(refundpolicy_entity_1.refundpolicy)),
    __param(7, (0, typeorm_1.InjectRepository)(installment_entity_1.Installment)),
    __param(8, (0, typeorm_1.InjectRepository)(albumimage_entity_1.AlbumImage)),
    __param(9, (0, typeorm_1.InjectRepository)(mainimage_entity_1.MainImage)),
    __param(10, (0, typeorm_1.InjectRepository)(visitedplace_entity_1.VisitedPlace)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TourpackageService);
exports.TourpackageService = TourpackageService;
//# sourceMappingURL=tourpackage.service.js.map