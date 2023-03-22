
import { PutObjectCommand, PutObjectCommandInput, PutObjectCommandOutput, S3Client } from '@aws-sdk/client-s3';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Express } from 'express';

@Injectable()
export class S3Service {
    private logger = new Logger(S3Service.name)
    private region: string;
    private s3: S3Client;

    constructor(private ConfigService: ConfigService) {
        this.region = this.ConfigService.get<string>('DO_REGION') || 'sgp1'
        this.s3 = new S3Client({
            forcePathStyle: false,
            endpoint: "https://ladiescdn.sgp1.digitaloceanspaces.com",
            region: 'sgp1',
            credentials: {
                accessKeyId: process.env.DO_ACCESS_KEY_ID,
                secretAccessKey: process.env.DO_SECRET_ACCESS_KEY
            }
        });
    }

    async travelimage(file: Express.Multer.File, key: string) {
        const bucket = this.ConfigService.get<string>('DO_BUCKET_NAME');
        console.log(file)

        const input: PutObjectCommandInput = {
            Body: file.buffer,
            Bucket: bucket,
            Key: key,
            ACL: 'public-read',
            ContentType: file.mimetype
        }

        try {
            const response: PutObjectCommandOutput = await this.s3.send(new PutObjectCommand(input));
            if (response.$metadata.httpStatusCode === 200) {
                return `https://${bucket}.s3.${this.region}.amazonaws.com/${key}`
            }
            throw new Error("image not save in amazxon s3")
        } catch (err) {
            this.logger.error("cannot save file inside s3", err);
            throw err;
        }


    }
}
