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
exports.bookingpolicy = void 0;
const class_validator_1 = require("@nestjs/class-validator");
const typeorm_1 = require("typeorm");
const tourpackage_entity_1 = require("./tourpackage.entity");
let bookingpolicy = class bookingpolicy {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], bookingpolicy.prototype, "BkId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], bookingpolicy.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tourpackage_entity_1.Tourpackage, (tourpackages) => tourpackages.BookingPolicys),
    (0, typeorm_1.JoinColumn)({ name: 'policyId' }),
    __metadata("design:type", tourpackage_entity_1.Tourpackage)
], bookingpolicy.prototype, "tourpackage", void 0);
bookingpolicy = __decorate([
    (0, typeorm_1.Entity)()
], bookingpolicy);
exports.bookingpolicy = bookingpolicy;
//# sourceMappingURL=bookingpolicy.entity.js.map