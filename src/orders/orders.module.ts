import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrderItemsModule } from './order-items/order-items.module';

@Module({
  controllers: [OrdersController],
  imports: [OrderItemsModule]
})
export class OrdersModule {}
