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
exports.AlbumImage = void 0;
const typeorm_1 = require("typeorm");
const tourpackage_entity_1 = require("./tourpackage.entity");
let AlbumImage = class AlbumImage {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AlbumImage.prototype, "AlbumId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", String)
], AlbumImage.prototype, "AlbumTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", String)
], AlbumImage.prototype, "albumImageUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tourpackage_entity_1.Tourpackage, tourpackage => tourpackage.albumImages),
    __metadata("design:type", tourpackage_entity_1.Tourpackage)
], AlbumImage.prototype, "tourpackage", void 0);
AlbumImage = __decorate([
    (0, typeorm_1.Entity)()
], AlbumImage);
exports.AlbumImage = AlbumImage;
//# sourceMappingURL=albumimage.entity.js.map