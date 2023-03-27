import { Tourpackage } from './../tourpackage/entities/tourpackage.entity';

import { DeleteObjectCommand, PutObjectCommand, PutObjectCommandInput, PutObjectCommandOutput, S3Client } from '@aws-sdk/client-s3';
import { Body, Injectable, Logger, Req, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Express } from 'express';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';

@Injectable()
export class S3Service {
    private logger = new Logger(S3Service.name)
    private region: string;
    private s3: S3Client;

    constructor(@InjectRepository(Tourpackage) private TourpackageRepo: Repository<Tourpackage>,
        private ConfigService: ConfigService) {
        this.region = this.ConfigService.get<string>('DO_REGION') || 'sgp1';
        this.s3 = new S3Client({
            endpoint: "https://sgp1.digitaloceanspaces.com",
            region: 'sgp1',
            credentials: {
                accessKeyId: 'DO007KE3UW4VALKKWU4G',
                secretAccessKey: 'gJ9x9vxAlZr8BQbNqpw0eUpcUqTDzipaTZb4UQ5oI0Q'
            }
        });
    }

    async Addimage(file: Express.Multer.File) {
        const bucket = this.ConfigService.get<string>('DO_BUCKET_NAME');
        const key = file.originalname
        const input: PutObjectCommandInput = {
            Body: file.buffer,
            Bucket: bucket,
            Key: key,
            ACL: 'public-read',
            ContentType: file.mimetype
        }
        try {
            const response: PutObjectCommandOutput = await this.s3.send(
                new PutObjectCommand(input),
            );
            if (response.$metadata.httpStatusCode === 200) {
                return `https://${bucket}.${this.region}.cdn.digitaloceanspaces.com/${key}`
            }
            throw new Error("image not save in digital ocean s3")
        } catch (err) {
            this.logger.error("cannot save file inside s3 spacebucket", err);
            throw err;
        }

    }


    async ReplaceImage(Id: number,file: Express.Multer.File ) {
        const tourpackage = await this.TourpackageRepo.findOne({ where: { Id } })
        const bucket = this.ConfigService.get<string>('DO_BUCKET_NAME')
        if (tourpackage.coverimageurl) {
            const coverimageurl = tourpackage.coverimageurl.split('/').pop();
            await this.s3.send(new DeleteObjectCommand({
                Bucket: bucket,
                Key: coverimageurl
            }))
        }
        const key = file.originalname
        try {
            const response: PutObjectCommandOutput = await this.s3.send(
                new PutObjectCommand({
                    Body: file.buffer,
                    Bucket: bucket,
                    Key: key,
                    ACL: 'public-read',
                    ContentType: file.mimetype
                }),   
            );
            if (response.$metadata.httpStatusCode === 200) {
                 return `https://${bucket}.${this.region}.cdn.digitaloceanspaces.com/${key}`
             
            }
            throw new Error("image not update in digital ocean s3")
            
        }
         catch (err) {
            this.logger.error("cannot save file inside s3 spacebucket", err);
            throw err;
        }

       
    }
}
