
import { Booking } from "src/booking/entity/booking.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AlbumImage } from "./albumimage.entity";
import { bookingpolicy } from "./bookingpolicy.entity";
import { Installment } from "./installment.entity";
import { MainImage } from "./mainimage.entity";
import { packageexcluions } from "./packageexclsuions.entity";
import { packagehighlight } from "./packagehighlight.entity";
import { Packageinclusion } from "./packageInclusion.entitry";
import { refundpolicy } from "./refundpolicy.entity";
import { tourpackageplan } from "./tourpackageplan.entity";
import { VisitedPlace } from "./visitedplace.entity";
import { Traveller } from "src/Traveller/entities/traveller.entity";


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
    City: string
    @Column({ nullable: true })
    Discount: number
    @Column({ nullable: true })
    StartDate: string;
    @Column({ nullable: true })
    EndDate: string;
    @Column({ nullable: true })
    TripType: string;
    @Column({ nullable: true, type: 'text' })
    Code: string
    @Column({ nullable: true })
    TotalDuration: string
    @Column('text', { nullable: true })
    PackageOverview: string;
    @Column('bool', { default: false, nullable: true })
    Availability: boolean
    @Column('bool', { default: false, nullable: true })
    Showpackage: boolean
    @Column('bool', { default: false, nullable: true })
    Flight: boolean
    @Column('bool', { default: false, nullable: true })
    Food: boolean
    @Column('bool', { default: false, nullable: true })
    Transport: boolean
    @Column('bool', { default: false, nullable: true })
    Hotel: boolean
    @Column({ nullable: true })
    coverimageurl: string

    @OneToMany(() => MainImage, (mainimage) => mainimage.tourpackage, {
        eager: true
    })
    mainimage: MainImage;

    @OneToMany(() => AlbumImage, (albumImage) => albumImage.tourpackage, {
        eager: true,
    })
    albumImages: AlbumImage;

    @OneToMany(() => VisitedPlace, (visitedimage) => visitedimage.tourpackage, {
        eager: true
    })
    vistitedImages: VisitedPlace;
    @OneToMany(() => packageexcluions, (exclusion) => exclusion.tourpackage, {
        eager: true,
    })
    exclusions: packageexcluions;
    @OneToMany(() => Packageinclusion, (inclsuions) => inclsuions.tourpackage, {
        eager: true,
    })
    PackageInclusions: Packageinclusion;

    @OneToMany(() => bookingpolicy, (policy) => policy.tourpackage, {
        eager: true, 
    })
    BookingPolicys: bookingpolicy;

    @OneToMany(() => packagehighlight, (highlights) => highlights.tourpackage, {
        eager: true,
    })
    highlights: packagehighlight;

    @OneToMany(() => refundpolicy, (refundpolicy) => refundpolicy.tourpackage, {
        eager: true,
    })
    refundpolicys: refundpolicy;

    @OneToMany(() => tourpackageplan, (dayplans) => dayplans.tourpackage, {
        eager: true, 
    })
    tourpackageplans: tourpackageplan;

    @OneToMany(() => Installment, (installment) => installment.tourpackage, {
        eager: true, cascade: false,
    })
    installments: Installment;


    @OneToMany(() => Booking, (booking) => booking.tourPackage)
    bookings: Booking[]


    @OneToMany(() => Traveller, traveler => traveler.tourPackage, { cascade: true })
    travelers: Traveller[];


}
