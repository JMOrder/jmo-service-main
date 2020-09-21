import { Module } from '@nestjs/common';
import { JwtService } from 'src/shared/jwt/jwt.service';
import { ProfileController } from './profile.controller';

@Module({
  controllers: [ProfileController],
  providers: [JwtService]
})
export class ProfileModule {}
