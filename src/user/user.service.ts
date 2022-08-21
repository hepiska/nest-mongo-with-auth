import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import UserModel from './user.model';
import { IUserDocument, IUser } from './user.types';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<IUserDocument>,
  ) {}

  async create(user: IUser): Promise<IUser> {
    const createdUser = await this.userModel.create(user);
    return createdUser;
  }
  async findOne(query?: Record<string, unknown>): Promise<IUserDocument> {
    return this.userModel.findOne(query).exec();
  }
  async findAll(
    query: Record<string, unknown>,
  ): Promise<IFindAll<IUserDocument>> {
    const data = await this.userModel.find(query).exec();
    const total = data.length;
    return { data, total };
  }
}
