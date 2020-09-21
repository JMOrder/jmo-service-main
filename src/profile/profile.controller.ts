import { Controller, Get, Headers } from '@nestjs/common';
import { UserEntity } from 'src/entity/user.entity';
import { JwtService } from 'src/shared/jwt/jwt.service';

@Controller('profile')
export class ProfileController {
  constructor(private jwtService: JwtService) {}
  @Get()
  findProfile(@Headers("Authorization") authorization: string): Promise<UserEntity> {
    return this.jwtService.getUser(authorization.replace("Bearer ", ""));
  }
}
