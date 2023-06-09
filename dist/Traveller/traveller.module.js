"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravellerModule = void 0;
const traveller_controller_1 = require("./traveller.controller");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const traveller_entity_1 = require("./entities/traveller.entity");
const traveller_services_1 = require("./traveller.services");
const s3_module_1 = require("../s3/s3.module");
let TravellerModule = class TravellerModule {
};
TravellerModule = __decorate([
    (0, common_1.Module)({
        imports: [s3_module_1.S3Module, typeorm_1.TypeOrmModule.forFeature([traveller_entity_1.Traveller])],
        controllers: [traveller_controller_1.TravellerController],
        providers: [traveller_services_1.TravellerServices]
    })
], TravellerModule);
exports.TravellerModule = TravellerModule;
//# sourceMappingURL=traveller.module.js.map