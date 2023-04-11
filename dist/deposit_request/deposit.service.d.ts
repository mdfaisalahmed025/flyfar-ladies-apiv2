import { Cheque } from './Entity/cheq.entity';
import { Repository } from 'typeorm';
import { Cash } from './Entity/cash.entity';
import { BankTransfer } from './Entity/BankTransfer.entity';
import { CardPayment } from './Entity/Cardpayment.entity';
import { Bkash } from './Entity/Bkash.entity';
import { MobileBanking } from './Entity/MobileBanking.entity';
export declare class DepositService {
    private chequeRepository;
    private CashRepository;
    private BankTransferRepository;
    private CardPaymentRepository;
    private BkashPaymentRepository;
    private MobileBankingRepository;
    constructor(chequeRepository: Repository<Cheque>, CashRepository: Repository<Cash>, BankTransferRepository: Repository<BankTransfer>, CardPaymentRepository: Repository<CardPayment>, BkashPaymentRepository: Repository<Bkash>, MobileBankingRepository: Repository<MobileBanking>);
    Findchequedeposit(id: string): Promise<Cheque>;
    FindAllchequedeposit(): Promise<Cheque[]>;
    FindCashdeposit(id: string): Promise<Cash>;
    FindAllCashdeposit(): Promise<Cash[]>;
    Findbankdeposit(id: string): Promise<BankTransfer>;
    FindAllCarddeposit(): Promise<CardPayment[]>;
    FindCarddeposit(id: string): Promise<CardPayment>;
    FindAllbankdeposit(): Promise<BankTransfer[]>;
    FindBkashdeposit(id: string): Promise<Bkash>;
    FindAllBkashdeposit(): Promise<Bkash[]>;
    FindMobBankdeposit(id: string): Promise<MobileBanking>;
    FindAllmobilebankhdeposit(): Promise<MobileBanking[]>;
}
