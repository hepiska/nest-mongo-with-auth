import { Document } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  active?: boolean;
}

export interface IUserDocument extends IUser, Document {
  createdAt: 'createdAt';
  updatedAt: 'updatedAt';
}
