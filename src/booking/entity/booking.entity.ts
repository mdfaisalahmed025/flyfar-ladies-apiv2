import { Traveller } from 'src/Traveller/entities/traveller.entity';
import { Tourpackage } from "src/tourpackage/entities/tourpackage.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Booking{
   @PrimaryGeneratedColumn('uuid')
   id:string
   @OneToMany(() => Tourpackage, (tourpackage)=>tourpackage.bookings)
   tourPackage:Tourpackage
   @OneToMany(() => Traveller, (traveller)=>traveller.bookings)
   travellers: Traveller;
   @Column()
   startDate: Date;
   @Column()
   endDate: Date;
   @Column()
   totalPrice: number;
}