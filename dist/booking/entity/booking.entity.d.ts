import { Traveller } from 'src/Traveller/entities/traveller.entity';
import { Tourpackage } from 'src/tourpackage/entities/tourpackage.entity';
export declare class Booking {
    Bookingid: string;
    tourPackage: Tourpackage;
    travelers: Traveller[];
    CreatedAt: Date;
    UpdatedAt: Date;
}
