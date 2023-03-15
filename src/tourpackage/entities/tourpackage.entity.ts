import { IsNotEmpty } from "@nestjs/class-validator";
import { Transform } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Tourpackage {
    @PrimaryGeneratedColumn()
    Id: number;
    @Column()
    @IsNotEmpty({ message: "Please enter PkId" })
    PkId: string;
    @Column()
    @IsNotEmpty()
    MainTitle: string;
    @Column()
    @IsNotEmpty()
    SubTitle: string;
    @IsNotEmpty()
    @Column()
    Price: string;
    @IsNotEmpty()
    @Column()
    Location: string;
    @Column()
    StartDate: string;
    @IsNotEmpty()
    @Column()
    EndDate: string;
    @IsNotEmpty()
    @Column()
    TripType: string;
    @IsNotEmpty()
    @Column({ default: true })
    Availability: boolean;
    @IsNotEmpty()
    @Column()
    TotalDuration: string;
    @IsNotEmpty()
    @Column('text')
    PackageOverview: string;
    @IsNotEmpty()
    @Column({ default: true })
    Showpackage: boolean;
    @IsNotEmpty()
    @Column()
    ImageUrl:string
}
