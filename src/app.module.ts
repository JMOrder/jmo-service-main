import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EurekaService } from './eureka/eureka.service';
import { AppLoggerModule } from './app-logger/app-logger.module';
import { UsersModule } from './users/users.module';
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { OrdersModule } from './orders/orders.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "jmorder_admin",
      password: "Admin123Admin123",
      database: "jmo_service_main_development",
      synchronize: false,
      logging: true,
      entities: ["dist/**/*.entity{ .ts,.js}"],
      migrations: [],
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy()
    }),
    AppLoggerModule,
    UsersModule,
    OrdersModule,
    ClientsModule
  ],
  providers: [EurekaService],
})
export class AppModule {}
