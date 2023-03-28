import { Tourpackage } from 'src/tourpackage/entities/tourpackage.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Installment {
  @PrimaryGeneratedColumn()
  Id: number;
  @Column({type:'date', nullable:true})
  Date: string;
  @Column({nullable:true})
  Amount: number;
  @ManyToOne(() => Tourpackage, (tourpackage) => tourpackage.installments)
  tourpackage: Tourpackage
}