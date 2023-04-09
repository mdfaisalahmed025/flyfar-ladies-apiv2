import { JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Booking } from 'src/booking/entity/booking.entity';
import { Tourpackage } from 'src/tourpackage/entities/tourpackage.entity';

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
   @Column({nullable:true})
   Email: string
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
   @ManyToMany(()=>Booking,(booking)=>booking.travelers,{eager:true})
   @JoinTable()
   bookings:Booking;
   @ManyToOne(() => Tourpackage, tourPackage => tourPackage.travelers,{eager:true})
   tourPackage: Tourpackage;
}