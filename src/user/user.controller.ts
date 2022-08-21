import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { IUserDocument } from './user.types';

@Controller()
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get()
  getUser(): Promise<IUserDocument> {
    return this.appService.findOne();
  }
}
