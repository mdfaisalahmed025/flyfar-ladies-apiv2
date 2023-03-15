import { IsNotEmpty } from '@nestjs/class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tourpackage } from './tourpackage.entity';


@Entity()
export class VisitedPalce{
   @PrimaryGeneratedColumn()
   Id:number
   @IsNotEmpty({message:"please give place number"})
   @Column({default:true})
   PlaceName:string
   @Column({default:true})
   fieldname: string;
   @Column({default:true})
   originalname: string;
   @Column({default:true})
   destination: string;
   @Column({default:true})
   filename: string;
   @Column({default:true})
   path: string;
   @ManyToOne(() => Tourpackage, tourpackage=>tourpackage.vistitedImages)
   @JoinColumn({name:'vistited image'})
   tourpackage:Tourpackage;
}