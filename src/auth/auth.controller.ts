import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  IAuthResponse,
  IRegisterInput,
  ILoginInput,
  IRequestWithUser,
} from './auth.type';
import { JwtAuthGuard } from './jwt-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async getUser(@Body() input: IRegisterInput): Promise<string> {
    await this.authService.register(input);
    return 'success';
  }

  @Post('/login')
  async login(@Body() input: ILoginInput): Promise<IAuthResponse> {
    try {
      const res = await this.authService.login(input.email, input.password);
      return res;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async me(@Req() request: IRequestWithUser) {
    const result = { ...request.user };
    delete result.password;
    return result;
  }
}
