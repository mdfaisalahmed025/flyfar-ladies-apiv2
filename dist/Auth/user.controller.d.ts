import { CreateUserDto } from './Dto/create-user.dto';
import { UserServices } from './user.service';
import { Request, Response } from 'express';
import { User } from './entities/user.entity';
import { updateUserDto } from './Dto/update-user.dto';
export declare class UserController {
    private userServices;
    constructor(userServices: UserServices);
    Register(userDto: CreateUserDto, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    login(Email: string, Password: string, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    verify(jwtToken: string): Promise<User>;
    FindAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    userDashboard(id: string, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateUser(id: string, req: Request, res: Response, userupdatedto: updateUserDto): Promise<Response<any, Record<string, any>>>;
    Deleteuser(id: string, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
