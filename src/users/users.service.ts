import {
  Injectable,
  BadRequestException,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/model/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async userList(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async singleUser(name: string): Promise<any> {
    try {
      return await this.userModel.findOne({ username: name }).exec();
    } catch (err) {
      throw new NotFoundException(err);
    }
  }
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
      };
      return await this.userModel.create(user);
    } catch (err) {
      throw new NotAcceptableException(err);
    }
  }
  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    console.log('update', userId, updateUserDto);
    try {
      return await this.userModel
        .findByIdAndUpdate(userId, updateUserDto, { new: true })
        .exec();
    } catch (err) {
      throw new NotAcceptableException(err);
    }
  }
  async deleteUser(userId: string): Promise<User> {
    try {
      return await this.userModel.findByIdAndDelete(userId).exec();
    } catch (err) {
      throw new NotAcceptableException(err);
    }
  }
}
