import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { OrderItemEntity } from "src/entity/order-item.entity";
import { OrderItemGetDto } from "./dto/get.dto";

@Controller("orders/:orderId/order-items")
export class OrderItemsController {
  @Post()
  async create(@Param("orderId") orderId: number, @Body() orderItem: OrderItemEntity): Promise<OrderItemGetDto> {
    orderItem.order = orderId;
    return plainToClass(OrderItemGetDto, await orderItem.save());
  }

  @Delete("/:orderItemId")
  async delete(@Param("orderId") orderId: number, @Param("orderItemId") orderItemId: number): Promise<void> {
    await OrderItemEntity.delete({ id: orderItemId, order: orderId });
  }
}