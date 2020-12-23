import { Controller, Get, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity } from 'src/entity/user.entity';
import { JwtService } from 'src/shared/jwt/jwt.service';

@Controller('profile')
export class ProfileController {
  constructor(private jwtService: JwtService) {}
  @Get()
  async findProfile(@Headers("Authorization") authorization: string): Promise<UserEntity> {
    const user: UserEntity = await this.jwtService.getUser(authorization.replace("Bearer ", ""));
    if (!user) throw new HttpException("NOT FOUND", HttpStatus.NOT_FOUND);
    return user;
  }
}
