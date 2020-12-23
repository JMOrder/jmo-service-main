import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { OrdersModule } from './orders/orders.module';
import { ClientsModule } from './clients/clients.module';
import { SharedModule } from './shared/shared.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { ProfileModule } from './profile/profile.module';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
        GOOGLE_CLOUD_PUBSUB_PROJECT_ID: Joi.string().default('jmorder'),
        GOOGLE_CLOUD_PUBSUB_SUBSCRIPTION_PREFIX: Joi.string().default('jmo-service-main'),
        SERVICE_RSA_PUBLIC_KEY: Joi.string().replace(/\\n/g, '\n').required()
      }),
    }),
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
