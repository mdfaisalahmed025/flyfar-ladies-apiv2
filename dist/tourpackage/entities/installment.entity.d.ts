import { Tourpackage } from 'src/tourpackage/entities/tourpackage.entity';
export declare class Installment {
    InstallmentId: number;
    Name: string;
    Date: string;
    Amount: number;
    tourpackage: Tourpackage;
}
