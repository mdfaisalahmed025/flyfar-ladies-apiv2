/// <reference types="multer" />
import { Request, Response } from 'express';
import { Repository } from "typeorm";
import { updateUserProfileDto } from "./Dto/update-userprofile.dto";
import { Userprofile } from "./entitties/userprofile.entities";
import { UserProfileServices } from "./userprofile.services";
import { S3Service } from "src/s3/s3.service";
export declare class userProfileController {
    private profileRepository;
    private readonly UserProfileServices;
    private s3service;
    constructor(profileRepository: Repository<Userprofile>, UserProfileServices: UserProfileServices, s3service: S3Service);
    addProfile(file: {
        PassportsizephotoUrl?: Express.Multer.File[];
        passportphotoUrl?: Express.Multer.File[];
    }, body: any, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    FindAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    TravellerDashboard(id: string, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateTraveller(id: string, req: Request, res: Response, Userprofileupdatedto: updateUserProfileDto): Promise<Response<any, Record<string, any>>>;
    DeleteTraveller(id: string, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    addToWishlist(Uid: string, Id: number): Promise<Userprofile>;
    removeFromWishlist(Uid: string, Id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    getWishlist(Uid: string): Promise<Userprofile>;
}
