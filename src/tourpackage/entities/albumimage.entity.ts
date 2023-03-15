
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tourpackage } from './tourpackage.entity';

@Entity()
export class AlbumImage{
   @PrimaryGeneratedColumn()
   AlbumId: number;
   @Column({default:true})
   AlbumTitle: string;
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
   @ManyToOne(() => Tourpackage, tourpackage=>tourpackage.albumImages)
   tourpackage:Tourpackage;
   
}
