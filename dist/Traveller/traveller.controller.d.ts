/// <reference types="multer" />
import { TravellerServices } from './traveller.services';
import { Request, Response } from 'express';
import { updateTravellerDto } from "./Dto/update-traveller.dto";
import { Traveller } from "./entities/traveller.entity";
import { Repository } from "typeorm/repository/Repository";
import { S3Service } from "src/s3/s3.service";
export declare class TravellerController {
    private tarvellerRepository;
    private readonly travellerServices;
    private s3service;
    constructor(tarvellerRepository: Repository<Traveller>, travellerServices: TravellerServices, s3service: S3Service);
    AddTraveller(files: Express.Multer.File[], body: any, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    FindAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    TravellerDashboard(id: string, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateTraveller(id: string, res: Response, updateTravellerdto: updateTravellerDto): Promise<Response<any, Record<string, any>>>;
    DeleteTraveller(id: string, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
