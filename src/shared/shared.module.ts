import { Module } from '@nestjs/common';
import { AppLoggerModule } from './app-logger/app-logger.module';
import { EurekaService } from './eureka/eureka.service';
import { JwtService } from './jwt/jwt.service';

@Module({
  imports: [
    AppLoggerModule
  ],
  providers: [
    EurekaService,
    JwtService
  ]
})
export class SharedModule {}
