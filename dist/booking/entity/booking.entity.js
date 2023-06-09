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
exports.Booking = void 0;
const traveller_entity_1 = require("../../Traveller/entities/traveller.entity");
const tourpackage_entity_1 = require("../../tourpackage/entities/tourpackage.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
let Booking = class Booking {
};
__decorate([
    (0, typeorm_2.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Booking.prototype, "Bookingid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tourpackage_entity_1.Tourpackage, tourPackage => tourPackage.bookings),
    __metadata("design:type", tourpackage_entity_1.Tourpackage)
], Booking.prototype, "tourPackage", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => traveller_entity_1.Traveller),
    (0, typeorm_1.JoinTable)({ name: 'Traveler_bookings' }),
    __metadata("design:type", Array)
], Booking.prototype, "travelers", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Booking.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Booking.prototype, "UpdatedAt", void 0);
Booking = __decorate([
    (0, typeorm_2.Entity)()
], Booking);
exports.Booking = Booking;
//# sourceMappingURL=booking.entity.js.map