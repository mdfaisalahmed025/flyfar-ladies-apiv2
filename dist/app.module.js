"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const config_1 = require("@nestjs/config");
const userprofile_entities_1 = require("./userProfile/entitties/userprofile.entities");
const tourpackage_entity_1 = require("./tourpackage/entities/tourpackage.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const tourpackage_module_1 = require("./tourpackage/tourpackage.module");
const albumimage_entity_1 = require("./tourpackage/entities/albumimage.entity");
const packageexclsuions_entity_1 = require("./tourpackage/entities/packageexclsuions.entity");
const packageInclusion_entitry_1 = require("./tourpackage/entities/packageInclusion.entitry");
const tourpackageplan_entity_1 = require("./tourpackage/entities/tourpackageplan.entity");
const packagehighlight_entity_1 = require("./tourpackage/entities/packagehighlight.entity");
const bookingpolicy_entity_1 = require("./tourpackage/entities/bookingpolicy.entity");
const visitedplace_entity_1 = require("./tourpackage/entities/visitedplace.entity");
const traveller_entity_1 = require("./Traveller/entities/traveller.entity");
const user_entity_1 = require("./Auth/entities/user.entity");
const user_module_1 = require("./Auth/user.module");
const traveller_module_1 = require("./Traveller/traveller.module");
const userprofile_module_1 = require("./userProfile/userprofile.module");
const refundpolicy_entity_1 = require("./tourpackage/entities/refundpolicy.entity");
const mainimage_entity_1 = require("./tourpackage/entities/mainimage.entity");
const s3_module_1 = require("./s3/s3.module");
const installment_entity_1 = require("./tourpackage/entities/installment.entity");
const booking_module_1 = require("./booking/booking.module");
const booking_entity_1 = require("./booking/entity/booking.entity");
const deposit_module_1 = require("./deposit_request/deposit.module");
const cheq_entity_1 = require("./deposit_request/Entity/cheq.entity");
const cash_entity_1 = require("./deposit_request/Entity/cash.entity");
const BankTransfer_entity_1 = require("./deposit_request/Entity/BankTransfer.entity");
const Cardpayment_entity_1 = require("./deposit_request/Entity/Cardpayment.entity");
const Bkash_entity_1 = require("./deposit_request/Entity/Bkash.entity");
const MobileBanking_entity_1 = require("./deposit_request/Entity/MobileBanking.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: '192.241.145.76',
                port: 3306,
                username: 'flyfarladies',
                password: 'F3r2r28AsiFzW8Ke',
                database: 'flyfarladies',
                entities: [user_entity_1.User,
                    cheq_entity_1.Cheque,
                    cash_entity_1.Cash,
                    BankTransfer_entity_1.BankTransfer,
                    Cardpayment_entity_1.CardPayment,
                    Bkash_entity_1.Bkash,
                    MobileBanking_entity_1.MobileBanking,
                    tourpackage_entity_1.Tourpackage,
                    mainimage_entity_1.MainImage,
                    albumimage_entity_1.AlbumImage,
                    packageexclsuions_entity_1.packageexcluions,
                    packageInclusion_entitry_1.Packageinclusion,
                    tourpackageplan_entity_1.tourpackageplan,
                    packagehighlight_entity_1.packagehighlight,
                    bookingpolicy_entity_1.bookingpolicy,
                    visitedplace_entity_1.VisitedPlace,
                    userprofile_entities_1.Userprofile,
                    traveller_entity_1.Traveller,
                    refundpolicy_entity_1.refundpolicy,
                    installment_entity_1.Installment,
                    booking_entity_1.Booking
                ],
                synchronize: true,
            }),
            user_module_1.UserModule,
            tourpackage_module_1.TourpackageModule,
            traveller_module_1.TravellerModule,
            userprofile_module_1.UsderProfileModule,
            s3_module_1.S3Module,
            config_1.ConfigModule,
            booking_module_1.BookingModule,
            deposit_module_1.DepositModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map