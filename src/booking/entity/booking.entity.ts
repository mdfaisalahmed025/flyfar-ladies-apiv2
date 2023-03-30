import { Traveller } from 'src/Traveller/entities/traveller.entity';
import { Tourpackage } from 'src/tourpackage/entities/tourpackage.entity';
import { ManyToOne, OneToMany } from 'typeorm';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Booking{
   @PrimaryGeneratedColumn('uuid')
   id:string
   @ManyToOne(() => Tourpackage, tourPackage => tourPackage.bookings)
   tourPackage: Tourpackage;
   @ManyToOne(() => Traveller, traveller => traveller.bookings)
   travelers: Traveller;


}