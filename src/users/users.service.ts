import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from '../config';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      if (createUserDto.password) {
        createUserDto.password = await bcrypt.hash(
          createUserDto.password,
          saltOrRounds,
        );
      }
      const user = new this.userModel(createUserDto);
      await user.save();
      return user;
    } catch (error) {
      throw new BadRequestException(error.message || '');
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().lean().exec();
  }

  async findOne(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    return user.toObject();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        saltOrRounds,
      );
    }

    return this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id).exec();
  }

  async findByEmail(email: string): Promise<UserDocument> {
    try {
      const user = await this.userModel.findOne({ email }).exec();

      if (!user) {
        throw new Error('Cannot find user');
      }
      return user.toObject();
    } catch (error) {
      throw new BadRequestException(error.message || '');
    }
  }
}
