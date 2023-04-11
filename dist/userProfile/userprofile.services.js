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
exports.UserProfileServices = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const userprofile_entities_1 = require("./entitties/userprofile.entities");
const tourpackage_entity_1 = require("../tourpackage/entities/tourpackage.entity");
let UserProfileServices = class UserProfileServices {
    constructor(userRepository, tourPackageRepository) {
        this.userRepository = userRepository;
        this.tourPackageRepository = tourPackageRepository;
    }
    async addToWishlist(Uid, Id) {
        const user = await this.userRepository.findOne({
            where: { Uid }, relations: {
                wishlist: true
            }
        });
        const tourPackage = await this.tourPackageRepository.findOne({ where: { Id } });
        if (!user || !tourPackage) {
            throw new common_1.HttpException('User or Tourpackage not found', common_1.HttpStatus.BAD_REQUEST);
        }
        user.wishlist.push(tourPackage);
        return await this.userRepository.save(user);
    }
    async removeFromWishlist(Uid, Id) {
        const user = await this.userRepository.findOne({ where: { Uid }, relations: { wishlist: true } });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.BAD_REQUEST);
        }
        user.wishlist = user.wishlist.filter((tourPackage) => tourPackage.Id !== Id);
        return this.userRepository.save(user);
    }
    async getWishlist(Uid) {
        return await this.userRepository.findOne({ where: { Uid } });
    }
    async FindAllProfile() {
        const Profile = await this.userRepository.find({});
        if (!Profile) {
            throw new common_1.HttpException("user Profile not found", common_1.HttpStatus.BAD_REQUEST);
        }
        return Profile;
    }
    async FindProfile(Uid) {
        const Profile = await this.userRepository.findOne({ where: { Uid } });
        if (!Profile) {
            throw new common_1.HttpException("Profile not found", common_1.HttpStatus.BAD_REQUEST);
        }
        return Profile;
    }
    async UpdateProfile(Uid, updtetProfilrDto) {
        const updtetProfileDto = await this.userRepository.update({ Uid }, Object.assign({}, updtetProfilrDto));
        return updtetProfileDto;
    }
    async DeleteProfile(Id) {
        const Profile = await this.userRepository.delete(Id);
        return Profile;
    }
};
UserProfileServices = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(userprofile_entities_1.Userprofile)),
    __param(1, (0, typeorm_1.InjectRepository)(tourpackage_entity_1.Tourpackage)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserProfileServices);
exports.UserProfileServices = UserProfileServices;
//# sourceMappingURL=userprofile.services.js.map