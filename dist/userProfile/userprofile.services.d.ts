import { Repository } from 'typeorm';
import { updateUserProfileDto } from './Dto/update-userprofile.dto';
import { Userprofile } from './entitties/userprofile.entities';
import { Tourpackage } from 'src/tourpackage/entities/tourpackage.entity';
export declare class UserProfileServices {
    private userRepository;
    private readonly tourPackageRepository;
    constructor(userRepository: Repository<Userprofile>, tourPackageRepository: Repository<Tourpackage>);
    addToWishlist(Uid: string, Id: number): Promise<Userprofile>;
    removeFromWishlist(Uid: string, Id: number): Promise<Userprofile>;
    getWishlist(Uid: string): Promise<Userprofile>;
    FindAllProfile(): Promise<Userprofile[]>;
    FindProfile(Uid: string): Promise<Userprofile>;
    UpdateProfile(Uid: string, updtetProfilrDto: updateUserProfileDto): Promise<import("typeorm").UpdateResult>;
    DeleteProfile(Id: string): Promise<import("typeorm").DeleteResult>;
}
