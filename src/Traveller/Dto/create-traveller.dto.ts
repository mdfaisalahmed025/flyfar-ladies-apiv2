import { INestApplication } from '@nestjs/common';

export class CreateTravellerDto{
   Id:string
   FirstName:string
   LastName:string
   DOB:string
   Gender:string
   PassportNumber:string
   PassportExpireDate:string
   PassportCopyURL:string

}