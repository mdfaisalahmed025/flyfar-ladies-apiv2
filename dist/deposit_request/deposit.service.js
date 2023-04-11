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
exports.DepositService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cheq_entity_1 = require("./Entity/cheq.entity");
const typeorm_2 = require("typeorm");
const cash_entity_1 = require("./Entity/cash.entity");
const BankTransfer_entity_1 = require("./Entity/BankTransfer.entity");
const Cardpayment_entity_1 = require("./Entity/Cardpayment.entity");
const Bkash_entity_1 = require("./Entity/Bkash.entity");
const MobileBanking_entity_1 = require("./Entity/MobileBanking.entity");
let DepositService = class DepositService {
    constructor(chequeRepository, CashRepository, BankTransferRepository, CardPaymentRepository, BkashPaymentRepository, MobileBankingRepository) {
        this.chequeRepository = chequeRepository;
        this.CashRepository = CashRepository;
        this.BankTransferRepository = BankTransferRepository;
        this.CardPaymentRepository = CardPaymentRepository;
        this.BkashPaymentRepository = BkashPaymentRepository;
        this.MobileBankingRepository = MobileBankingRepository;
    }
    async Findchequedeposit(id) {
        const cheque = await this.chequeRepository.findOne({ where: { id } });
        if (!cheque) {
            throw new common_1.HttpException(`No deposit found with this =${id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return cheque;
    }
    async FindAllchequedeposit() {
        const cheque = await this.chequeRepository.find({});
        return cheque;
    }
    async FindCashdeposit(id) {
        const cash = await this.CashRepository.findOne({ where: { id } });
        if (!cash) {
            throw new common_1.HttpException(`No Cash deposit found with this =${id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return cash;
    }
    async FindAllCashdeposit() {
        const cash = await this.CashRepository.find({});
        return cash;
    }
    async Findbankdeposit(id) {
        const bank = await this.BankTransferRepository.findOne({ where: { id } });
        if (!bank) {
            throw new common_1.HttpException(`No bank deposit found with this =${id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return bank;
    }
    async FindAllCarddeposit() {
        const bank = await this.CardPaymentRepository.find({});
        return bank;
    }
    async FindCarddeposit(id) {
        const card = await this.CardPaymentRepository.findOne({ where: { id } });
        if (!card) {
            throw new common_1.HttpException(`No card deposit found with this =${id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return card;
    }
    async FindAllbankdeposit() {
        const bank = await this.BankTransferRepository.find({});
        return bank;
    }
    async FindBkashdeposit(id) {
        const Bkash = await this.BkashPaymentRepository.findOne({ where: { id } });
        if (!Bkash) {
            throw new common_1.HttpException(`No Bkash deposit found with this =${id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return Bkash;
    }
    async FindAllBkashdeposit() {
        const Bkash = await this.BkashPaymentRepository.find({});
        return Bkash;
    }
    async FindMobBankdeposit(id) {
        const MobBank = await this.MobileBankingRepository.findOne({ where: { id } });
        if (!MobBank) {
            throw new common_1.HttpException(`No Mobile Bank deposit found with this =${id}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return MobBank;
    }
    async FindAllmobilebankhdeposit() {
        const mobilebank = await this.MobileBankingRepository.find({});
        return mobilebank;
    }
};
DepositService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cheq_entity_1.Cheque)),
    __param(1, (0, typeorm_1.InjectRepository)(cash_entity_1.Cash)),
    __param(2, (0, typeorm_1.InjectRepository)(BankTransfer_entity_1.BankTransfer)),
    __param(3, (0, typeorm_1.InjectRepository)(Cardpayment_entity_1.CardPayment)),
    __param(4, (0, typeorm_1.InjectRepository)(Bkash_entity_1.Bkash)),
    __param(5, (0, typeorm_1.InjectRepository)(MobileBanking_entity_1.MobileBanking)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DepositService);
exports.DepositService = DepositService;
//# sourceMappingURL=deposit.service.js.map