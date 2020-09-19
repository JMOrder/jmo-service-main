import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { OrderGetDto } from './dto/get.dto';
import { OrderIndexDto } from './dto/index.dto';
import { OrderEntity } from '../entity/order.entity';

@Controller('orders')
export class OrdersController {
  @Get()
  async getList(): Promise<OrderIndexDto[]> {
    const orders: OrderEntity[] = await OrderEntity.find({
      order: { createdAt: "DESC" }
    });
    return plainToClass(OrderIndexDto, orders);
  }

  @Get("/:id")
  async get(@Param("id") id: number): Promise<OrderGetDto | undefined> {
    return plainToClass(OrderGetDto, await OrderEntity.findOne(id));
  }

  @Post()
  async create(@Body("user") userId: number, @Body("client") clientId: number): Promise<OrderGetDto> {
    const order: OrderEntity = new OrderEntity();
    order.user = userId;
    order.client = clientId;
    const createdOrder: OrderEntity = await order.save();
    return plainToClass(OrderGetDto, await OrderEntity.findOne(createdOrder.id));
  }

  @Put("/:id")
  async update(@Body() order: OrderEntity): Promise<OrderGetDto> {
    await order.save();
    return plainToClass(OrderGetDto, order);
  }

  @Delete("/:id")
  async delete(@Param("id") id: number): Promise<void> {
    await OrderEntity.delete(id);
  }
}
