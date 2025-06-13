import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
// import { User  } from './model/users.model';
import { User, UserSchema } from './schema/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
