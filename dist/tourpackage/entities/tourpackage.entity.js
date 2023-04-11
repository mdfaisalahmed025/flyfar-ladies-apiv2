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
exports.Tourpackage = void 0;
const booking_entity_1 = require("../../booking/entity/booking.entity");
const typeorm_1 = require("typeorm");
const albumimage_entity_1 = require("./albumimage.entity");
const bookingpolicy_entity_1 = require("./bookingpolicy.entity");
const installment_entity_1 = require("./installment.entity");
const mainimage_entity_1 = require("./mainimage.entity");
const packageexclsuions_entity_1 = require("./packageexclsuions.entity");
const packagehighlight_entity_1 = require("./packagehighlight.entity");
const packageInclusion_entitry_1 = require("./packageInclusion.entitry");
const refundpolicy_entity_1 = require("./refundpolicy.entity");
const tourpackageplan_entity_1 = require("./tourpackageplan.entity");
const visitedplace_entity_1 = require("./visitedplace.entity");
const userprofile_entities_1 = require("../../userProfile/entitties/userprofile.entities");
let Tourpackage = class Tourpackage {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Tourpackage.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Tourpackage.prototype, "MainTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Tourpackage.prototype, "SubTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Tourpackage.prototype, "Price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Tourpackage.prototype, "Location", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Tourpackage.prototype, "City", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Tourpackage.prototype, "Discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Tourpackage.prototype, "StartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Tourpackage.prototype, "EndDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Tourpackage.prototype, "TripType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], Tourpackage.prototype, "Code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Tourpackage.prototype, "TotalDuration", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Tourpackage.prototype, "PackageOverview", void 0);
__decorate([
    (0, typeorm_1.Column)('bool', { default: false, nullable: true }),
    __metadata("design:type", Boolean)
], Tourpackage.prototype, "Availability", void 0);
__decorate([
    (0, typeorm_1.Column)('bool', { default: false, nullable: true }),
    __metadata("design:type", Boolean)
], Tourpackage.prototype, "Showpackage", void 0);
__decorate([
    (0, typeorm_1.Column)('bool', { default: false, nullable: true }),
    __metadata("design:type", Boolean)
], Tourpackage.prototype, "Flight", void 0);
__decorate([
    (0, typeorm_1.Column)('bool', { default: false, nullable: true }),
    __metadata("design:type", Boolean)
], Tourpackage.prototype, "Food", void 0);
__decorate([
    (0, typeorm_1.Column)('bool', { default: false, nullable: true }),
    __metadata("design:type", Boolean)
], Tourpackage.prototype, "Transport", void 0);
__decorate([
    (0, typeorm_1.Column)('bool', { default: false, nullable: true }),
    __metadata("design:type", Boolean)
], Tourpackage.prototype, "Hotel", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Tourpackage.prototype, "coverimageurl", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mainimage_entity_1.MainImage, (mainimage) => mainimage.tourpackage, {
        eager: true, cascade: false
    }),
    __metadata("design:type", mainimage_entity_1.MainImage)
], Tourpackage.prototype, "mainimage", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => albumimage_entity_1.AlbumImage, (albumImage) => albumImage.tourpackage, {
        eager: true, cascade: false
    }),
    __metadata("design:type", albumimage_entity_1.AlbumImage)
], Tourpackage.prototype, "albumImages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => visitedplace_entity_1.VisitedPlace, (visitedimage) => visitedimage.tourpackage, {
        eager: true, cascade: false
    }),
    __metadata("design:type", visitedplace_entity_1.VisitedPlace)
], Tourpackage.prototype, "vistitedImages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => packageexclsuions_entity_1.packageexcluions, (exclusion) => exclusion.tourpackage, {
        eager: true, cascade: false
    }),
    __metadata("design:type", packageexclsuions_entity_1.packageexcluions)
], Tourpackage.prototype, "exclusions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => packageInclusion_entitry_1.Packageinclusion, (inclsuions) => inclsuions.tourpackage, {
        eager: true, cascade: false
    }),
    __metadata("design:type", packageInclusion_entitry_1.Packageinclusion)
], Tourpackage.prototype, "PackageInclusions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bookingpolicy_entity_1.bookingpolicy, (policy) => policy.tourpackage, {
        eager: true, cascade: false
    }),
    __metadata("design:type", bookingpolicy_entity_1.bookingpolicy)
], Tourpackage.prototype, "BookingPolicys", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => packagehighlight_entity_1.packagehighlight, (highlights) => highlights.tourpackage, {
        eager: true, cascade: false
    }),
    __metadata("design:type", packagehighlight_entity_1.packagehighlight)
], Tourpackage.prototype, "highlights", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => refundpolicy_entity_1.refundpolicy, (refundpolicy) => refundpolicy.tourpackage, {
        eager: true, cascade: false
    }),
    __metadata("design:type", refundpolicy_entity_1.refundpolicy)
], Tourpackage.prototype, "refundpolicys", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tourpackageplan_entity_1.tourpackageplan, (dayplans) => dayplans.tourpackage, {
        eager: true, cascade: false
    }),
    __metadata("design:type", tourpackageplan_entity_1.tourpackageplan)
], Tourpackage.prototype, "tourpackageplans", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => installment_entity_1.Installment, (installment) => installment.tourpackage, {
        eager: true, cascade: false,
    }),
    __metadata("design:type", installment_entity_1.Installment)
], Tourpackage.prototype, "installments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => booking_entity_1.Booking, (booking) => booking.tourPackage),
    __metadata("design:type", Array)
], Tourpackage.prototype, "bookings", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userprofile_entities_1.Userprofile, userprofile => userprofile.wishlist),
    __metadata("design:type", Array)
], Tourpackage.prototype, "usersWishlist", void 0);
Tourpackage = __decorate([
    (0, typeorm_1.Entity)()
], Tourpackage);
exports.Tourpackage = Tourpackage;
//# sourceMappingURL=tourpackage.entity.js.map