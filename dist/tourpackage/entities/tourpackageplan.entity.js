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
Object.defineProperty(exports, "__esModule", { value: true });
exports.tourpackageplan = void 0;
const class_validator_1 = require("@nestjs/class-validator");
const typeorm_1 = require("typeorm");
const tourpackage_entity_1 = require("./tourpackage.entity");
let tourpackageplan = class tourpackageplan {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], tourpackageplan.prototype, "dayId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], tourpackageplan.prototype, "dayplan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tourpackage_entity_1.Tourpackage, (tourpackages) => tourpackages.tourpackageplans),
    (0, typeorm_1.JoinColumn)({ name: 'Tour_package_plan' }),
    __metadata("design:type", tourpackage_entity_1.Tourpackage)
], tourpackageplan.prototype, "tourpackage", void 0);
tourpackageplan = __decorate([
    (0, typeorm_1.Entity)()
], tourpackageplan);
exports.tourpackageplan = tourpackageplan;
//# sourceMappingURL=tourpackageplan.entity.js.map