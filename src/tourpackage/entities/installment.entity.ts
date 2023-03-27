import { Tourpackage } from 'src/tourpackage/entities/tourpackage.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Installment {
  @PrimaryGeneratedColumn()
  Id: number;
  @Column()
  Day: number;
  @Column()
  Amount: number;

  @ManyToOne(() => Tourpackage, tourpackage => tourpackage.installments)
  tourPackage: Tourpackage
}