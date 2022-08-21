import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject } from '@nestjs/common';
import { config } from 'src/config/env.config';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  @Inject(UserService)
  private readonly userServices: UserService;
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtsecret,
    });
  }

  async validate(payload: any) {
    const user = await (
      await this.userServices.findOne({ _id: payload.id })
    ).toObject();
    return user;
  }
}
