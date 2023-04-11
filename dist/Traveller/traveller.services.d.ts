import { Repository } from 'typeorm';
import { updateTravellerDto } from './Dto/update-traveller.dto';
import { Traveller } from './entities/traveller.entity';
export declare class TravellerServices {
    private tarvellerRepository;
    constructor(tarvellerRepository: Repository<Traveller>);
    FindAllTraveller(): Promise<Traveller[]>;
    FindTrveller(TravellerId: string): Promise<Traveller>;
    UpdateTravller(TravellerId: string, updatetravellerdto: updateTravellerDto): Promise<import("typeorm").UpdateResult>;
    DeleteTraveller(TravellerId: string): Promise<import("typeorm").DeleteResult>;
}
