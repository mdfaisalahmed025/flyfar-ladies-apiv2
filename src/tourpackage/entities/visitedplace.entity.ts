
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tourpackage } from './tourpackage.entity';


@Entity()
export class VisitedPlace{
   @PrimaryGeneratedColumn()
   Id:number
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
   VisitedImagePath: string;
   @ManyToOne(() => Tourpackage, tourpackage=>tourpackage.vistitedImages)
   @JoinColumn({name:'visited image'})
   tourpackage:Tourpackage;
}