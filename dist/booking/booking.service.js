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
exports.BookingService = void 0;
const s3_service_1 = require("./../s3/s3.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tourpackage_entity_1 = require("../tourpackage/entities/tourpackage.entity");
const traveller_entity_1 = require("../Traveller/entities/traveller.entity");
const typeorm_2 = require("typeorm");
const booking_entity_1 = require("./entity/booking.entity");
let BookingService = class BookingService {
    constructor(tourPackageRepository, travelerRepository, bookingRepository, s3service) {
        this.tourPackageRepository = tourPackageRepository;
        this.travelerRepository = travelerRepository;
        this.bookingRepository = bookingRepository;
        this.s3service = s3service;
    }
    async BookTravelpackage(Id, bookingDto) {
        const { travelers, } = bookingDto;
        const tourPackage = await this.tourPackageRepository.findOne({ where: { Id } });
        if (!tourPackage) {
            throw new common_1.HttpException(`TourPackage not found with this id=${Id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const arrayoftravlers = [];
        for (const traveler of travelers) {
            const { FirstName, LastName, DOB, PassportExpireDate, PassportNumber, Nationality } = traveler;
            const newTraveler = new traveller_entity_1.Traveller();
            newTraveler.FirstName = FirstName;
            newTraveler.LastName = LastName;
            newTraveler.Nationality = Nationality;
            newTraveler.DOB = DOB;
            newTraveler.PassportNumber = PassportNumber;
            newTraveler.PassportExpireDate = PassportExpireDate;
            await this.travelerRepository.save(newTraveler);
            arrayoftravlers.push(newTraveler);
        }
        const booking = await this.bookingRepository.create({
            tourPackage,
            travelers: arrayoftravlers
        });
        await this.bookingRepository.save(booking);
        return booking;
    }
    async getBooking(Bookingid) {
        const bookedpackage = await this.bookingRepository.find({ where: { Bookingid }, relations: ['tourPackage', 'travelers'] });
        return bookedpackage;
    }
    async FindAll() {
        const bookings = await this.bookingRepository.find({ relations: ['tourPackage',
                'travelers'] });
        return bookings;
    }
};
BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tourpackage_entity_1.Tourpackage)),
    __param(1, (0, typeorm_1.InjectRepository)(traveller_entity_1.Traveller)),
    __param(2, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        s3_service_1.S3Service])
], BookingService);
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map