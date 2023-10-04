import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { AnyObject, Model } from 'mongoose';

import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { UpdateAdoptionDto } from './dto/update-adoption.dto';
import { Adoption } from './entities/adoption.entity';

@Injectable()
export class AdoptionService {
  constructor(
    @InjectModel(Adoption.name)
    private adoptionModel: Model<Adoption>,
  ) { }

  async create(createAdoptionDto: CreateAdoptionDto): Promise<Adoption> {
    try {
      const adoption = new this.adoptionModel(createAdoptionDto);
      await adoption.save();

      return adoption;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`${createAdoptionDto.name} already exists!`);
      }

      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateAdoptionDto: UpdateAdoptionDto): Promise<Adoption> {
    try {
      const updatedAdoption = await this.adoptionModel.findByIdAndUpdate(id, updateAdoptionDto, { new: true });

      return updatedAdoption;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Adoption[]> {
    try {
      const adoptions = await this.adoptionModel.find();

      if (adoptions) {
        return adoptions;
      }

      return [];
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string): Promise<Adoption> {
    try {
      const adoption = await this.adoptionModel.findOne({ _id: id });

      return adoption;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  remove(id: string): Promise<AnyObject> {
    try {
      return this.adoptionModel.deleteOne({ _id: id });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
