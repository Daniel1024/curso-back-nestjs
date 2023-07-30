import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Cherokee',
    },
  ];

  findAll() {
    return this.cars;
  }

  findById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);
    return car;
  }

  createCar(car: CreateCarDto) {
    const newCar: Car = {
      id: uuid(),
      ...car,
    };
    this.cars.push(newCar);

    return Promise.resolve(newCar);
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findById(id);

    this.cars = this.cars.map(car => {
      if (car.id === id) {
        carDB = {
          ...carDB,
          ...updateCarDto,
          id,
        };
        return carDB;
      }
      return car;
    });
    return carDB;
  }

  delete(id: string) {
    this.findById(id);
    this.cars = this.cars.filter(car => car.id !== id);
    return;
  }
}
