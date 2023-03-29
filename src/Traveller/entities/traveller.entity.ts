import { Booking } from './../../booking/entity/booking.entity';

import { Tourpackage } from 'src/tourpackage/entities/tourpackage.entity';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Traveller {
   @PrimaryGeneratedColumn('uuid')
   TravellerId:string
   @Column()   
   FirstName:string
   @Column()
   LastName:string
   @Column()
   DOB:string
   @Column()
   Gender:string
   @Column()
   PassportNumber:string
   @Column()
   PassportExpireDate:string
   @Column()
   PassportCopyURL:string
   @CreateDateColumn()
   CreatedAt:Date
   @UpdateDateColumn()
   UpdatedAt:Date
   @ManyToOne(()=>Booking,(booking)=>booking.travellers)
   bookings:Tourpackage;
}