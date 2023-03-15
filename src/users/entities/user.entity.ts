import { IsNotEmpty } from "@nestjs/class-validator"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    Id: number
    @IsNotEmpty()
    @Column()
    Name: string
    @IsNotEmpty()
    @Column()
    @IsNotEmpty()
    Email: string
    @IsNotEmpty()
    @Column()
    Password: string
}
