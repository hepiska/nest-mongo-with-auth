import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config/env.config';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: config.jwtsecret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
