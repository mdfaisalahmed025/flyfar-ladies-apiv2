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
exports.userProfileController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const update_userprofile_dto_1 = require("./Dto/update-userprofile.dto");
const userprofile_entities_1 = require("./entitties/userprofile.entities");
const userprofile_services_1 = require("./userprofile.services");
const s3_service_1 = require("../s3/s3.service");
let userProfileController = class userProfileController {
    constructor(profileRepository, UserProfileServices, s3service) {
        this.profileRepository = profileRepository;
        this.UserProfileServices = UserProfileServices;
        this.s3service = s3service;
    }
    async addProfile(file, body, req, res) {
        const PassportsizephotoUrl = await this.s3service.Addimage(file.PassportsizephotoUrl[0]);
        const passportphotoUrl = await this.s3service.Addimage(file.passportphotoUrl[0]);
        const userprofile = new userprofile_entities_1.Userprofile();
        userprofile.PassportCopy = passportphotoUrl;
        userprofile.PassportsizephotoUrl = PassportsizephotoUrl;
        userprofile.NameTitle = req.body.NameTitle;
        userprofile.FirstName = req.body.FirstName;
        userprofile.LastName = req.body.LastName;
        userprofile.DOB = req.body.DOB;
        userprofile.Gender = req.body.Gender;
        userprofile.Profession = req.body.Profession;
        userprofile.Nationality = req.body.Nationality;
        userprofile.Mobile = req.body.Mobile;
        userprofile.NID = req.body.NID;
        userprofile.PassportExpireDate = req.body.PassportExpireDate;
        userprofile.PassportNumber = req.body.PassportNumber;
        userprofile.FaceBookId = req.body.FaceBookId;
        userprofile.LinkedIn = req.body.LinkedIn;
        userprofile.WhatsApp = req.body.whatsApp;
        await this.profileRepository.save(Object.assign({}, userprofile));
        return res.status(common_1.HttpStatus.CREATED).json({ staus: "success", message: 'user Profile Added successfully' });
    }
    async FindAll(req, res) {
        const Profile = await this.UserProfileServices.FindAllProfile();
        return res.status(common_1.HttpStatus.OK).json({ Profile });
    }
    async TravellerDashboard(id, req, res) {
        const traveller = await this.UserProfileServices.FindProfile(id);
        return res.status(common_1.HttpStatus.OK).json({ traveller });
    }
    async updateTraveller(id, req, res, Userprofileupdatedto) {
        await this.UserProfileServices.UpdateProfile(id, Userprofileupdatedto);
        return res.status(common_1.HttpStatus.OK).json({ message: 'traveller updated successfully' });
    }
    async DeleteTraveller(id, req, res) {
        await this.UserProfileServices.DeleteProfile(id);
        return res.status(common_1.HttpStatus.OK).json({ message: 'traveller has deleted' });
    }
    async addToWishlist(Uid, Id) {
        return this.UserProfileServices.addToWishlist(Uid, Id);
    }
    async removeFromWishlist(Uid, Id, res) {
        await this.UserProfileServices.removeFromWishlist(Uid, Id);
        return res.status(common_1.HttpStatus.OK).json({
            status: "success",
            message: `Wishlist has removed`,
        });
    }
    async getWishlist(Uid) {
        return this.UserProfileServices.getWishlist(Uid);
    }
};
__decorate([
    (0, common_1.Post)('addProfile'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'PassportsizephotoUrl', maxCount: 2 },
        { name: 'passportphotoUrl', maxCount: 2 },
    ])),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], userProfileController.prototype, "addProfile", null);
__decorate([
    (0, common_1.Get)('AllProfile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], userProfileController.prototype, "FindAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], userProfileController.prototype, "TravellerDashboard", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, update_userprofile_dto_1.updateUserProfileDto]),
    __metadata("design:returntype", Promise)
], userProfileController.prototype, "updateTraveller", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], userProfileController.prototype, "DeleteTraveller", null);
__decorate([
    (0, common_1.Post)(':Uid/:Id'),
    __param(0, (0, common_1.Param)('Uid', new common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)('Id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], userProfileController.prototype, "addToWishlist", null);
__decorate([
    (0, common_1.Delete)(':Uid/:Id'),
    __param(0, (0, common_1.Param)('Uid', new common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)('Id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], userProfileController.prototype, "removeFromWishlist", null);
__decorate([
    (0, common_1.Get)(':Uid'),
    __param(0, (0, common_1.Param)('Uid', new common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], userProfileController.prototype, "getWishlist", null);
userProfileController = __decorate([
    (0, common_1.Controller)('userProfile'),
    __param(0, (0, typeorm_1.InjectRepository)(userprofile_entities_1.Userprofile)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        userprofile_services_1.UserProfileServices,
        s3_service_1.S3Service])
], userProfileController);
exports.userProfileController = userProfileController;
//# sourceMappingURL=userprofile.controller.js.map