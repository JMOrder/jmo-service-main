import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EurekaService } from './eureka/eureka.service';
import { AppLoggerModule } from './app-logger/app-logger.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AppLoggerModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService, EurekaService],
})
export class AppModule {}
