import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { IRegisterInput } from './auth.type';
import * as bycript from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { IUserDocument } from 'src/user/user.types';

@Injectable()
export class AuthService {
  constructor(private jwtServices: JwtService) {}

  @Inject(UserService)
  private readonly userServices: UserService;

  async register(input: IRegisterInput) {
    return this.userServices.create(input);
  }

  async validateUser(email: string, password: string): Promise<IUserDocument> {
    const user = await this.userServices.findOne({ email });
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!user.active) {
      throw new Error('user not active');
    }
    await bycript.compare(password, user.password);
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const resPayload = {
      email: user.email,
      access_token: this.jwtServices.sign({ id: user._id, email: user.email }),
    };
    return resPayload;
  }
}
