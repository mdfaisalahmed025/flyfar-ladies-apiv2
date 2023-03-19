
import { Transform } from "class-transformer";
import { IsBoolean, IsBooleanString } from "class-validator";
import { text } from "stream/consumers";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AlbumImage } from "./albumimage.entity";
import { bookingpolicy } from "./bookingpolicy.entity";
import { packageexcluions } from "./packageexclsuions.entity";
import { packagehighlight } from "./packagehighlight.entity";
import { packageincluded } from "./PackageInclude.entity";
import { Packageinclusion } from "./packageInclusion.entitry";
import { refundpolicy } from "./refundpolicy.entity";
import { tourpackageplan } from "./tourpackageplan.entity";
import { VisitedPlace } from "./visitedplace.entity";


@Entity()
export class Tourpackage {
    @PrimaryGeneratedColumn()
    Id: number;
    @Column({ nullable: true })
    MainTitle: string;
    @Column({ nullable: true })
    SubTitle: string;
    @Column({ nullable: true })
    Price: string;
    @Column({ nullable: true })
    Location: string;
    @Column({ nullable: true })
    StartDate: string;
    @Column({ nullable: true })
    EndDate: string;
    @Column({ nullable: true })
    TripType: string;
    @Column({ nullable: true })
    TotalDuration: string
    @Column('text', { nullable: true})
    PackageOverview: string;
    @IsBoolean()
    @Column('bool', {nullable:true, default:false})
    Availability: boolean
    @IsBoolean()
    @Column('bool',{nullable:true,default:false})
    Showpackage: boolean
    @Column({nullable:true})
    ImageUrl: string
    @OneToMany(() => AlbumImage, (albumImage) => albumImage.tourpackage, {
        eager: true,
        onUpdate: "RESTRICT",
        cascade: true,
    })
    @JoinColumn({ name: 'album image' })
    albumImages: AlbumImage;

    @OneToMany(() => VisitedPlace, (visitedimage) => visitedimage.tourpackage, {
        eager: true, cascade: false, onDelete: "RESTRICT",
        onUpdate: "RESTRICT"
    })
    vistitedImages: VisitedPlace;
    @OneToMany(() => packageexcluions, (exclusion) => exclusion.tourpackage, {
        eager: true, cascade: false, onDelete: "RESTRICT",
        onUpdate: "RESTRICT"
    })
    exclusions: packageexcluions;
    @OneToMany(() => Packageinclusion, (inclsuions) => inclsuions.tourpackage, {
        eager: true, onDelete: "RESTRICT",
        onUpdate: "RESTRICT"
    })
    PackageInclusions: Packageinclusion;

    @OneToMany(() => bookingpolicy, (policy) => policy.tourpackage, {
        eager: true, onDelete: "RESTRICT",
        onUpdate: "RESTRICT"
    })
    BookingPolicys: bookingpolicy;

    @OneToMany(() => packagehighlight, (highlights) => highlights.tourpackage, {
        eager: true, onDelete: "RESTRICT",
        onUpdate: "RESTRICT"
    })
    highlights: packagehighlight;

    @OneToMany(() => packageincluded, (includes) => includes.tourpackage, {
        eager: true, onDelete: "RESTRICT",
        onUpdate: "RESTRICT"
    })
    includes: packageincluded;

    @OneToMany(() => refundpolicy, (refundpolicy) => refundpolicy.tourpackage, {
        eager: true, onDelete: "RESTRICT",
        onUpdate: "RESTRICT"
    })
    refundpolicys: refundpolicy;

    @OneToMany(() => tourpackageplan, (dayplans) => dayplans.tourpackage, {
        eager: true, onDelete: "RESTRICT",
        onUpdate: "RESTRICT"
    })
    tourpackageplans: tourpackageplan;
}
