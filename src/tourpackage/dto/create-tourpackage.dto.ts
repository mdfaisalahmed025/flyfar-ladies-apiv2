import { Transform } from "class-transformer"

export class CreateTourpackageDto {
    Id: number
    PkId: string
    MainTitle: string
    SubTitle: string
    Price: string
    Location: string
    StartDate: string
    EndDate: string
    TripType: string
    Availability: boolean
    TotalDuration: string
    PackageOverview: string
    Showpackage: boolean
    ImageUrl:string
    file: Express.Multer.File;

}
