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
exports.DepositController = void 0;
const common_1 = require("@nestjs/common");
const deposit_service_1 = require("./deposit.service");
const platform_express_1 = require("@nestjs/platform-express");
const s3_service_1 = require("../s3/s3.service");
const cheq_entity_1 = require("./Entity/cheq.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cash_entity_1 = require("./Entity/cash.entity");
const BankTransfer_entity_1 = require("./Entity/BankTransfer.entity");
const Cardpayment_entity_1 = require("./Entity/Cardpayment.entity");
const Bkash_entity_1 = require("./Entity/Bkash.entity");
const MobileBanking_entity_1 = require("./Entity/MobileBanking.entity");
let DepositController = class DepositController {
    constructor(chequeRepository, CashRepository, BankTransferRepository, CardPaymentRepository, BkashPaymentRepository, MobileBankingRepository, depositService, s3service) {
        this.chequeRepository = chequeRepository;
        this.CashRepository = CashRepository;
        this.BankTransferRepository = BankTransferRepository;
        this.CardPaymentRepository = CardPaymentRepository;
        this.BkashPaymentRepository = BkashPaymentRepository;
        this.MobileBankingRepository = MobileBankingRepository;
        this.depositService = depositService;
        this.s3service = s3service;
    }
    async ChequeDeposit(file, req, res) {
        const chequeattachmenturl = await this.s3service.Addimage(file);
        const cheque = new cheq_entity_1.Cheque();
        cheque.chequeattachmenturl = chequeattachmenturl;
        cheque.ChequeNumber = req.body.ChequeNumber;
        cheque.BankName = req.body.BankName;
        cheque.ChequeDate = req.body.ChequeDate;
        cheque.Reference = req.body.Reference;
        cheque.Amount = req.body.Amount;
        await this.chequeRepository.save(cheque);
        return res.status(common_1.HttpStatus.OK).send({ status: "success", message: " Cheque Deposit Request Successfull", });
    }
    async getchequedeposit(id, req, res) {
        const chequedeposit = await this.depositService.Findchequedeposit(id);
        return res.status(common_1.HttpStatus.OK).json({ chequedeposit });
    }
    async getAllchequedeposit(req, res) {
        const Allchequedeposit = await this.depositService.FindAllchequedeposit();
        return res.status(common_1.HttpStatus.OK).json({ Allchequedeposit });
    }
    async cashdeposit(file, req, res) {
        const cashattachmenturl = await this.s3service.Addimage(file);
        const cash = new cash_entity_1.Cash();
        cash.cashattachmenturl = cashattachmenturl;
        cash.Name = req.body.Name;
        cash.ReceiverName = req.body.ReceiverName;
        cash.Reference = req.body.Reference;
        cash.Amount = req.body.Amount;
        await this.CashRepository.save(cash);
        return res.status(common_1.HttpStatus.OK).send({ status: "success", message: " Cash Deposit Request Successfull", });
    }
    async getcashdeposit(id, req, res) {
        const cashdeposit = await this.depositService.FindCashdeposit(id);
        return res.status(common_1.HttpStatus.OK).json({ cashdeposit });
    }
    async getAllCashdeposit(req, res) {
        const Allcashdeposit = await this.depositService.FindAllCashdeposit();
        return res.status(common_1.HttpStatus.OK).json({ Allcashdeposit });
    }
    async BankDeposit(file, req, res) {
        const Bankattachmenturl = await this.s3service.Addimage(file);
        const Banktransfer = new BankTransfer_entity_1.BankTransfer();
        Banktransfer.Bankattachmenturl = Bankattachmenturl;
        Banktransfer.DepositFrom = req.body.DepositFrom;
        Banktransfer.DepositTo = req.body.DepositTo;
        Banktransfer.ChequeDate = req.body.ChequeDate;
        Banktransfer.TransactionId = req.body.TransactionId;
        Banktransfer.Amount = req.body.Amount;
        await this.BankTransferRepository.save(Banktransfer);
        return res.status(common_1.HttpStatus.OK).send({ status: "success", message: " Banktransfer Deposit Request Successfull", });
    }
    async getbankdeposit(id, req, res) {
        const cashdeposit = await this.depositService.Findbankdeposit(id);
        return res.status(common_1.HttpStatus.OK).json({ cashdeposit });
    }
    async getAllbankdeposit(req, res) {
        const Allcashdeposit = await this.depositService.FindAllbankdeposit();
        return res.status(common_1.HttpStatus.OK).json({ Allcashdeposit });
    }
    async CardPaymentDeposit(req, res) {
        const Cardpayment = new Cardpayment_entity_1.CardPayment();
        Cardpayment.Amount = req.body.Amount;
        const amount = Cardpayment.Amount;
        if (amount < 100) {
            throw new common_1.HttpException(`Minimum deposit 100TK`, common_1.HttpStatus.BAD_REQUEST);
        }
        Cardpayment.Amount = amount;
        const fee = amount * 2.2 / 100;
        Cardpayment.GatewayFee = fee;
        const depositedAmount = amount - fee;
        Cardpayment.DepositedAmount = depositedAmount;
        await this.CardPaymentRepository.save(Cardpayment);
        return res.status(common_1.HttpStatus.OK).send({ status: "success", message: " Card  Deposit Request Successfull", });
    }
    async getcarddeposit(id, req, res) {
        const getcarddeposit = await this.depositService.FindCarddeposit(id);
        return res.status(common_1.HttpStatus.OK).json({ getcarddeposit });
    }
    async allcarddeposit(req, res) {
        const allcarddeposit = await this.depositService.FindAllCarddeposit();
        return res.status(common_1.HttpStatus.OK).json({ allcarddeposit });
    }
    async bkashdeposit(req, res) {
        const Bkashdeposit = new Bkash_entity_1.Bkash();
        Bkashdeposit.Amount = req.body.Amount;
        const amount = Bkashdeposit.Amount;
        if (amount < 20) {
            throw new common_1.HttpException(`Minimum deposit 20TK`, common_1.HttpStatus.BAD_REQUEST);
        }
        Bkashdeposit.Amount = amount;
        const fee = amount * 1.5 / 100;
        Bkashdeposit.GatewayFee = fee;
        const depositedAmount = amount - fee;
        Bkashdeposit.DepositedAmount = depositedAmount;
        await this.BkashPaymentRepository.save(Bkashdeposit);
        return res.status(common_1.HttpStatus.OK).send({ status: "success", message: " Bkash Deposit Request Successfull", });
    }
    async getBkashdeposit(id, req, res) {
        const Bkash = await this.depositService.FindBkashdeposit(id);
        return res.status(common_1.HttpStatus.OK).json({ Bkash });
    }
    async allBkashdeposit(req, res) {
        const allBkashdeposit = await this.depositService.FindAllBkashdeposit();
        return res.status(common_1.HttpStatus.OK).json({ allBkashdeposit });
    }
    async MobileBankdeposit(file, req, res) {
        const MobBankattachmenturl = await this.s3service.Addimage(file);
        const MobileBank = new MobileBanking_entity_1.MobileBanking();
        MobileBank.MobBankattachmenturl = MobBankattachmenturl;
        MobileBank.AgentType = req.body.AgentType;
        MobileBank.AccountNumber = req.body.AccountNumber;
        MobileBank.Reference = req.body.Reference;
        MobileBank.TransactionId = req.body.TransactionId;
        MobileBank.Amount = req.body.Amount;
        const amount = MobileBank.Amount;
        MobileBank.Amount = amount;
        const fee = amount * 1.5 / 100;
        MobileBank.GatewayFee = fee;
        const depositedAmount = amount - fee;
        MobileBank.DepositedAmount = depositedAmount;
        await this.MobileBankingRepository.save(MobileBank);
        return res.status(common_1.HttpStatus.OK).send({ status: "success", message: " Mobile Banking Deposit Request Successfull", });
    }
    async getMobileBankdeposit(id, req, res) {
        const mobilebanking = await this.depositService.FindMobBankdeposit(id);
        return res.status(common_1.HttpStatus.OK).json({ mobilebanking });
    }
    async allmobilebankingdeposit(req, res) {
        const mobilebanking = await this.depositService.FindAllmobilebankhdeposit();
        return res.status(common_1.HttpStatus.OK).json({ mobilebanking });
    }
};
__decorate([
    (0, common_1.Post)('Addchequedeposit'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('chequeattachmenturl')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "ChequeDeposit", null);
__decorate([
    (0, common_1.Get)('getchequedeposit/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "getchequedeposit", null);
__decorate([
    (0, common_1.Get)('allchequedeposit'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "getAllchequedeposit", null);
__decorate([
    (0, common_1.Post)('Addcashdeposit'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('cashattachmenturl')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "cashdeposit", null);
__decorate([
    (0, common_1.Get)('getcashdeposit/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "getcashdeposit", null);
__decorate([
    (0, common_1.Get)('allcashdeposit'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "getAllCashdeposit", null);
__decorate([
    (0, common_1.Post)('AddBankdeposit'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('Bankattachmenturl')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "BankDeposit", null);
__decorate([
    (0, common_1.Get)('getbankdeposit/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "getbankdeposit", null);
__decorate([
    (0, common_1.Get)('allbankdeposit'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "getAllbankdeposit", null);
__decorate([
    (0, common_1.Post)('carddeposit'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "CardPaymentDeposit", null);
__decorate([
    (0, common_1.Get)('getcarddeposit/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "getcarddeposit", null);
__decorate([
    (0, common_1.Get)('allcarddeposit'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "allcarddeposit", null);
__decorate([
    (0, common_1.Post)('bkashdeposit'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('chequeattachmenturl')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "bkashdeposit", null);
__decorate([
    (0, common_1.Get)('getBkashdeposit/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "getBkashdeposit", null);
__decorate([
    (0, common_1.Get)('allbkashdeposit'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "allBkashdeposit", null);
__decorate([
    (0, common_1.Post)('MobileBankdeposit'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('MobBankattachmenturl')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "MobileBankdeposit", null);
__decorate([
    (0, common_1.Get)('MobileBankdeposit/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "getMobileBankdeposit", null);
__decorate([
    (0, common_1.Get)('allmobilebankingdeposit'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "allmobilebankingdeposit", null);
DepositController = __decorate([
    (0, common_1.Controller)('depositrequest'),
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
        typeorm_2.Repository,
        deposit_service_1.DepositService,
        s3_service_1.S3Service])
], DepositController);
exports.DepositController = DepositController;
//# sourceMappingURL=deposit.controller.js.map