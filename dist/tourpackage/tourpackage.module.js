"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourpackageModule = void 0;
const s3_module_1 = require("./../s3/s3.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const tourpackage_service_1 = require("./tourpackage.service");
const tourpackage_controller_1 = require("./tourpackage.controller");
const tourpackage_entity_1 = require("./entities/tourpackage.entity");
const albumimage_entity_1 = require("./entities/albumimage.entity");
const visitedplace_entity_1 = require("./entities/visitedplace.entity");
const packageInclusion_entitry_1 = require("./entities/packageInclusion.entitry");
const tourpackageplan_entity_1 = require("./entities/tourpackageplan.entity");
const packageexclsuions_entity_1 = require("./entities/packageexclsuions.entity");
const packagehighlight_entity_1 = require("./entities/packagehighlight.entity");
const bookingpolicy_entity_1 = require("./entities/bookingpolicy.entity");
const refundpolicy_entity_1 = require("./entities/refundpolicy.entity");
const mainimage_entity_1 = require("./entities/mainimage.entity");
const installment_entity_1 = require("./entities/installment.entity");
const traveller_entity_1 = require("../Traveller/entities/traveller.entity");
const traveller_module_1 = require("../Traveller/traveller.module");
let TourpackageModule = class TourpackageModule {
};
TourpackageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true
            }),
            s3_module_1.S3Module,
            traveller_module_1.TravellerModule,
            typeorm_1.TypeOrmModule.forFeature([
                traveller_entity_1.Traveller,
                tourpackage_entity_1.Tourpackage,
                mainimage_entity_1.MainImage,
                albumimage_entity_1.AlbumImage,
                visitedplace_entity_1.VisitedPlace,
                packageInclusion_entitry_1.Packageinclusion,
                tourpackageplan_entity_1.tourpackageplan,
                packageexclsuions_entity_1.packageexcluions,
                packagehighlight_entity_1.packagehighlight,
                bookingpolicy_entity_1.bookingpolicy,
                tourpackage_entity_1.Tourpackage,
                refundpolicy_entity_1.refundpolicy,
                installment_entity_1.Installment
            ])
        ],
        controllers: [tourpackage_controller_1.TourpackageController],
        providers: [tourpackage_service_1.TourpackageService],
        exports: [tourpackage_service_1.TourpackageService]
    })
], TourpackageModule);
exports.TourpackageModule = TourpackageModule;
//# sourceMappingURL=tourpackage.module.js.map