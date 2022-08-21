import { Request } from '@nestjs/common';
import { IUser } from 'src/user/user.types';

export interface IAuthResponse {
  access_token: string;
  email: string;
}

export interface IRegisterInput {
  name: string;
  password: string;
  email: string;
  phoneNumber: string;
}

export interface ILoginInput {
  password: string;
  email: string;
}

export interface IRequestWithUser extends Request {
  user: IUser;
}
