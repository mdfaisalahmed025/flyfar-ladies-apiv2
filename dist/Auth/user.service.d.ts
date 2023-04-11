import { Repository } from 'typeorm/repository/Repository';
import { User } from './entities/user.entity';
import { CreateUserDto } from './Dto/create-user.dto';
import { updateUserDto } from './Dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UserServices {
    private userRepo;
    private readonly jwtService;
    constructor(userRepo: Repository<User>, jwtService: JwtService);
    Register(userDto: CreateUserDto): Promise<string>;
    generateToken(userdto: CreateUserDto): Promise<string>;
    login(Email: string, Password: string): Promise<string>;
    verifyToken(jwtToken: string): Promise<User>;
    getUserByEmail(Email: string): Promise<User>;
    FindAllUser(): Promise<User[]>;
    findUserById(Id: string): Promise<User>;
    UpdateUser(Id: string, updteuserDto: updateUserDto): Promise<import("typeorm").UpdateResult>;
    DeleteUser(Id: string): Promise<import("typeorm").DeleteResult>;
}
