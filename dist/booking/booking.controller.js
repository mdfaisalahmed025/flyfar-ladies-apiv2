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
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const booking_service_1 = require("./booking.service");
const booking_dto_1 = require("./dto/booking.dto");
let BookingController = class BookingController {
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    async addbooking(bookingDto, Id, req, res) {
        const booking = await this.bookingService.BookTravelpackage(Id, bookingDto);
        return res.status(common_1.HttpStatus.OK).send({ status: "success", message: "Booking Confirmed", booking });
    }
    async getBooking(Bookingid) {
        return await this.bookingService.getBooking(Bookingid);
    }
    async getALlBooking(res) {
        const bookings = await this.bookingService.FindAll();
        return res.status(common_1.HttpStatus.OK).json({ bookings });
    }
};
__decorate([
    (0, common_1.Post)(':Id/addbooking'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_2.Param)('Id')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_dto_1.CreateBookingDto, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "addbooking", null);
__decorate([
    (0, common_2.Get)(':Bookingid'),
    __param(0, (0, common_2.Param)('Bookingid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getBooking", null);
__decorate([
    (0, common_2.Get)('getall/booking'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getALlBooking", null);
BookingController = __decorate([
    (0, common_2.Controller)('booking'),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], BookingController);
exports.BookingController = BookingController;
//# sourceMappingURL=booking.controller.js.map