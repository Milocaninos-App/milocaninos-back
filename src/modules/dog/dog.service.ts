import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnyObject, Model } from 'mongoose';
import { CreateDogDto, UpdateDogDto } from './dto';
import { Dog } from './entities/dog.entity';

@Injectable()
export class DogService {
  constructor(
    @InjectModel(Dog.name)
    private dogModel: Model<Dog>,
  ) { }

  async create(createDogDto: CreateDogDto): Promise<Dog> {
    try {
      const dog = new this.dogModel(createDogDto);
      await dog.save();

      return dog;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`${createDogDto.name} already exists!`);
      }

      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateDogDto: UpdateDogDto): Promise<Dog> {
    try {
      const dog = await this.dogModel.findByIdAndUpdate(id, updateDogDto, { new: true });

      return dog;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Dog[]> {
    try {
      const dogs = await this.dogModel.find();

      if (dogs) {
        return dogs;
      }

      return [];
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string): Promise<Dog> {
    try {
      const dog = await this.dogModel.findOne({ _id: id });

      return dog;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  remove(id: string): Promise<AnyObject> {
    try {
      return this.dogModel.deleteOne({ _id: id });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
