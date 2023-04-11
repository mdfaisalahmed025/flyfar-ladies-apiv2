"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsderProfileModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const userprofile_entities_1 = require("./entitties/userprofile.entities");
const userprofile_controller_1 = require("./userprofile.controller");
const userprofile_services_1 = require("./userprofile.services");
const tourpackage_entity_1 = require("../tourpackage/entities/tourpackage.entity");
const tourpackage_module_1 = require("../tourpackage/tourpackage.module");
const s3_module_1 = require("../s3/s3.module");
let UsderProfileModule = class UsderProfileModule {
};
UsderProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([userprofile_entities_1.Userprofile, tourpackage_entity_1.Tourpackage]), tourpackage_module_1.TourpackageModule, s3_module_1.S3Module],
        controllers: [userprofile_controller_1.userProfileController],
        providers: [userprofile_services_1.UserProfileServices]
    })
], UsderProfileModule);
exports.UsderProfileModule = UsderProfileModule;
//# sourceMappingURL=userprofile.module.js.map