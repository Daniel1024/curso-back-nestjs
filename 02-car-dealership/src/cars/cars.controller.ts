import {
  Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarByUd(@Param('id', ParseUUIDPipe) id: string) {
    console.log({ id });
    return this.carsService.findById(id);
  }

  @Post()
  async createCar(@Body() createCarDto: CreateCarDto) {
    const car = await this.carsService.createCar(createCarDto);
    return {
      ok: 'true',
      car,
    };
  }

  @Patch(':id')
  updateCar(
    @Body() updateCarDto: UpdateCarDto,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ) {
    const car = this.carsService.update(id, updateCarDto);
    return {
      ok: 'true',
      id,
      oldCar: updateCarDto,
      newCar: car,
    };
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    this.carsService.delete(id);
  }
}
