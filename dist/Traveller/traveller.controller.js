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
exports.TravellerController = void 0;
const common_1 = require("@nestjs/common");
const traveller_services_1 = require("./traveller.services");
const update_traveller_dto_1 = require("./Dto/update-traveller.dto");
const platform_express_1 = require("@nestjs/platform-express");
const traveller_entity_1 = require("./entities/traveller.entity");
const Repository_1 = require("typeorm/repository/Repository");
const typeorm_1 = require("@nestjs/typeorm");
const s3_service_1 = require("../s3/s3.service");
let TravellerController = class TravellerController {
    constructor(tarvellerRepository, travellerServices, s3service) {
        this.tarvellerRepository = tarvellerRepository;
        this.travellerServices = travellerServices;
        this.s3service = s3service;
    }
    async AddTraveller(files, body, req, res) {
        for (const file of files) {
            const passportCopyurl = await this.s3service.Addimage(file);
            const traveller = new traveller_entity_1.Traveller();
            traveller.PassportCopyURL = passportCopyurl;
            traveller.FirstName = req.body.FirstName;
            traveller.LastName = req.body.LastName;
            traveller.PassportNumber = req.body.PassportNumber;
            traveller.PassportExpireDate = req.body.PassportExpireDate;
            traveller.DOB = req.body.DOB;
            traveller.Gender = req.body.Gender;
            await this.tarvellerRepository.save(Object.assign({}, traveller));
        }
        return res.status(common_1.HttpStatus.OK).send({ status: "success", message: "Traveller added succesfully" });
    }
    async FindAll(req, res) {
        const traveller = await this.travellerServices.FindAllTraveller();
        return res.status(common_1.HttpStatus.OK).json({ traveller });
    }
    async TravellerDashboard(id, req, res) {
        const traveller = await this.travellerServices.FindTrveller(id);
        return res.status(common_1.HttpStatus.OK).json({ traveller });
    }
    async updateTraveller(id, res, updateTravellerdto) {
        await this.travellerServices.UpdateTravller(id, updateTravellerdto);
        return res.status(common_1.HttpStatus.OK).json({ status: "success", message: 'traveller updated successfully' });
    }
    async DeleteTraveller(id, req, res) {
        await this.travellerServices.DeleteTraveller(id);
        return res.status(common_1.HttpStatus.OK).json({ message: 'traveller has deleted' });
    }
};
__decorate([
    (0, common_1.Post)('addnewtraveller'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('passportimage', 5)),
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
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TravellerController.prototype, "AddTraveller", null);
__decorate([
    (0, common_1.Get)('Alltraveller'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TravellerController.prototype, "FindAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TravellerController.prototype, "TravellerDashboard", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_traveller_dto_1.updateTravellerDto]),
    __metadata("design:returntype", Promise)
], TravellerController.prototype, "updateTraveller", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TravellerController.prototype, "DeleteTraveller", null);
TravellerController = __decorate([
    (0, common_1.Controller)('Traveller'),
    __param(0, (0, typeorm_1.InjectRepository)(traveller_entity_1.Traveller)),
    __metadata("design:paramtypes", [Repository_1.Repository,
        traveller_services_1.TravellerServices,
        s3_service_1.S3Service])
], TravellerController);
exports.TravellerController = TravellerController;
//# sourceMappingURL=traveller.controller.js.map