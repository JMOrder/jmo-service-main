import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EurekaService } from './eureka/eureka.service';

@Module({
  imports: [
    TypeOrmModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService, EurekaService],
})
export class AppModule {}
