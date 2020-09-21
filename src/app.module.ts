import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { OrdersModule } from './orders/orders.module';
import { ClientsModule } from './clients/clients.module';
import { SharedModule } from './shared/shared.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { ProfileModule } from './profile/profile.module';

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
    SharedModule,
    UsersModule,
    OrdersModule,
    ClientsModule,
    OrderItemsModule,
    ProfileModule
  ],
  providers: [],
})
export class AppModule {}
