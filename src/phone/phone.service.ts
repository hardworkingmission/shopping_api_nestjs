import {
  Injectable,
  BadRequestException,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Phone, PhoneDocument } from 'src/model/phone.schema';
import { CreatePhoneDto } from './dto/create-user.dto';
import { UpdatePhoneDto } from './dto/update-user.dto';

@Injectable()
export class PhoneService {
  constructor(
    @InjectModel(Phone.name) private phoneModel: Model<PhoneDocument>,
  ) {}

  async phoneList(): Promise<Phone[]> {
    try {
      console.log('Service called')
      return this.phoneModel.find().exec();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
  async singlePhone(name: string): Promise<Phone> {
    try {
      return await this.phoneModel.findOne({ name }).exec();
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async createPhone(createPhoneDto: CreatePhoneDto): Promise<Phone> {
    try {
      return await this.phoneModel.create(createPhoneDto);
    } catch (err) {
      throw new NotAcceptableException(err);
    }
  }
  async updatePhone(
    id: string,
    updatePhoneDto: UpdatePhoneDto,
  ): Promise<Phone> {
    try {
      return await this.phoneModel
        .findByIdAndUpdate(id, updatePhoneDto, { new: true })
        .exec();
    } catch (err) {
      throw new NotAcceptableException(err);
    }
  }

  async deletePhone(id: string): Promise<Phone> {
    try {
      return await this.phoneModel.findByIdAndDelete(id).exec();
    } catch (err) {
      throw new NotAcceptableException(err);
    }
  }
}
