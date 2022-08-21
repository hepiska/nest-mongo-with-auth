import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import userModel from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: userModel.name, schema: userModel.schema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
