import { createReadStream } from 'fs';

import { PutObjectCommand, PutObjectCommandInput, PutObjectCommandOutput, S3Client } from '@aws-sdk/client-s3';
import { Body, Injectable, Logger, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Express } from 'express';
import { Request, Response } from 'express';

@Injectable()
export class S3Service {
    private logger = new Logger(S3Service.name)
    private region: string;
    private s3: S3Client;

    constructor(private ConfigService: ConfigService) {
        this.region = this.ConfigService.get<string>('DO_REGION') || 'sgp1';
        this.s3 = new S3Client({
            endpoint: "https://sgp1.digitaloceanspaces.com",
            region: 'sgp1',
            credentials: {
                accessKeyId:'DO007KE3UW4VALKKWU4G',
                secretAccessKey:'gJ9x9vxAlZr8BQbNqpw0eUpcUqTDzipaTZb4UQ5oI0Q'
            }
        });
    }
    async travelimage(file:Express.Multer.File) {
        const bucket = this.ConfigService.get<string>('DO_BUCKET_NAME');
        const key = file.fieldname
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
            throw new Error("image not save in amazxon s3")
        } catch (err) {
            this.logger.error("cannot save file inside s3", err);
            throw err;
        }

    }
}
