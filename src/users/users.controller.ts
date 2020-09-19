import { Controller, Get, Param } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserGetDto } from './dto/get.dto';
import { UserIndexDto } from './dto/Index.dto';
import { UserEntity } from './user.entity';

@Controller('users')
export class UsersController {
  @Get()
  async findAll(): Promise<UserIndexDto[]> {
    const users: UserEntity[] = await UserEntity.find();
    return plainToClass(UserIndexDto, users);
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<UserGetDto> {
    return plainToClass(UserGetDto, await UserEntity.findOne(id));
  }
}
