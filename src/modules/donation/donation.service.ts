import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Donation } from './entities/donation.entity';
import { AnyObject, Model } from 'mongoose';

@Injectable()
export class DonationService {
  constructor(
    @InjectModel(Donation.name)
    private donationModel: Model<Donation>,
  ) { }

  async create(createDonationDto: CreateDonationDto): Promise<Donation> {
    try {
      const donation = new this.donationModel(createDonationDto);
      await donation.save();

      return donation;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`${createDonationDto.name} already exists!`);
      }

      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Donation[]> {
    try {
      const donations = await this.donationModel.find();

      if (donations) {
        return donations;
      }

      return [];
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string): Promise<Donation> {
    try {
      const donation = await this.donationModel.findOne({ _id: id });

      return donation;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  remove(id: string): Promise<AnyObject> {
    try {
      return this.donationModel.deleteOne({ _id: id });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
