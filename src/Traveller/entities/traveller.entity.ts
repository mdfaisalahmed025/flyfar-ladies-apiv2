
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Traveller {
   @PrimaryGeneratedColumn()
   Id:string
   @IsNotEmpty()
   @Column()   
   FirstName:string
   @IsNotEmpty()
   @Column()
   LastName:string
   @IsNotEmpty()
   @Column()
   DOB:string
   @IsNotEmpty()
   @Column()
   Gender:string
   @IsNotEmpty()
   @Column()
   PassportNumber:string
   @IsNotEmpty()
   @Column()
   PassportExpireDate:string
   @IsNotEmpty()
   @Column()
   PassportCopyURL:string
   @CreateDateColumn()
   CreatedAt:Date
   @UpdateDateColumn()
   UpdatedAt:Date
}