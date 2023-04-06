
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsString()
  bookingId: string;

  @IsNotEmpty()
  @IsNumber()
  tourPackageId: number;

  @IsNotEmpty()
  @IsArray()
  @IsString()
  travelerIds: string[];
}