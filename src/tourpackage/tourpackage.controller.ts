import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TourpackageService } from './tourpackage.service';
import { CreateTourpackageDto } from './dto/create-tourpackage.dto';
import { UpdateTourpackageDto } from './dto/update-tourpackage.dto';

@Controller('tourpackage')
export class TourpackageController {
  constructor(private readonly tourpackageService: TourpackageService) {}

  @Post('create')
  create(@Body() createTourpackageDto: CreateTourpackageDto) {
    return this.tourpackageService.create(createTourpackageDto);
  }

  @Get('getall')
  findAll() {
    return this.tourpackageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tourpackageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTourpackageDto: UpdateTourpackageDto) {
    return this.tourpackageService.update(+id, updateTourpackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tourpackageService.remove(+id);
  }
}
