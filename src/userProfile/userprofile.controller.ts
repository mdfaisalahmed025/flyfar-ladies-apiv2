
import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Patch, Post, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { InjectRepository } from "@nestjs/typeorm";
import { Request, Response } from 'express';
import { diskStorage } from "multer";
import { Repository } from "typeorm";
import { CreateUserProfileDto } from "./Dto/create-userprofile.dto";
import { updateUserProfileDto } from "./Dto/update-userprofile.dto";
import { Userprofile } from "./entitties/userprofile.entities";
import { UserProfileServices } from "./userprofile.services";



@Controller('userProfile')
export class userProfileController {
   constructor(@InjectRepository(Userprofile) private profileRepository: Repository<Userprofile>,
      private readonly UserProfileServices: UserProfileServices) { }

   // Add Traveller
   @Post('addProfile')
   @UseInterceptors(FileFieldsInterceptor([
      { name: 'passportsizephoto', maxCount: 2 },
      { name: 'passportphoto', maxCount: 5 },
   ]))
   async addProfile(
      @UploadedFiles(
         // new ParseFilePipeBuilder()
         //    .addFileTypeValidator({
         //       fileType: /(jpg|jpeg|png|gif)$/,
         //    })
         //    .addMaxSizeValidator({
         //       maxSize: 1024 * 1024 * 6,
         //    })
         //    .build({
         //       errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
         //    }),
      )
      files: { passportsizephoto?: Express.Multer.File, passportphoto?: Express.Multer.File},
      @Body() body,
      @Req() req: Request,
      @Res() res: Response) {
         const userprofile = new Userprofile();
         userprofile.PassportCopy = files.passportphoto.path
         userprofile.PassportSizePhoto = files.passportsizephoto.path
         userprofile.NameTitle = req.body.NameTitle
         userprofile.FirstName = req.body.FirstName
         userprofile.LastName = req.body.LastName
         userprofile.DOB = req.body.DOB
         userprofile.Gender = req.body.Gender
         userprofile.Profession = req.body.Profession
         userprofile.Nationality = req.body.Nationality
         userprofile.Mobile = req.body.Mobile
         userprofile.NID = req.body.NID
         userprofile.PassportExpireDate = req.body.PassportExpireDate
         userprofile.PassportNumber = req.body.PassportNumber
         userprofile.FaceBookId = req.body.FaceBookId
         userprofile.LinkedIn = req.body.LinkedIn
         userprofile.whatsApp = req.body.whatsApp
         await this.profileRepository.save({ ...userprofile })
      
      return res.status(HttpStatus.CREATED).json({ message: 'user Profile Added successfully' });
   }


   // all user

   @Get('AllProfile')
   async FindAll(
      @Req() req: Request,
      @Res() res: Response) {
      const Profile = await this.UserProfileServices.FindAllProfile();
      return res.status(HttpStatus.OK).json({ Profile });
   }

   // // get user dashbboard
   @Get(':id')
   async TravellerDashboard(
      @Param('id') id: string,
      @Req() req: Request,
      @Res() res: Response) {
      const traveller = await this.UserProfileServices.FindProfile(id);
      return res.status(HttpStatus.OK).json({ traveller });
   }

   @Patch(':id')
   async updateTraveller(
      @Param('id') id: string,
      @Req() req: Request,
      @Res() res: Response,
      @Body() Userprofileupdatedto: updateUserProfileDto) {
      await this.UserProfileServices.UpdateProfile(id, Userprofileupdatedto)
      return res.status(HttpStatus.OK).json({ message: 'traveller updated successfully' });
   }

   @Delete(':id')
   async DeleteTraveller(
      @Param('id') id: string,
      @Req() req: Request,
      @Res() res: Response) {
      await this.UserProfileServices.DeleteProfile(id)
      return res.status(HttpStatus.OK).json({ message: 'traveller has deleted' });
   }

}