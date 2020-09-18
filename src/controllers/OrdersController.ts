import { Controller, Get, Delete, PathParams, Status, BodyParams, Post, Put } from "@tsed/common";
import { Authenticate } from "@tsed/passport";
import { OrderIndexDto, OrderGetDto } from "@dto/OrderDto";
import { ReturnsArray, Returns } from "@tsed/swagger";
import { Order } from "@entity/Order";
import { plainToClass } from "class-transformer";
import { NO_CONTENT, OK, NOT_FOUND } from "http-status-codes";
import { NotFound } from "@tsed/exceptions";

@Controller("/orders")
@Authenticate("jwt-user")
export class OrdersController {
  @Get("/")
  @ReturnsArray(OrderIndexDto)
  async getList(): Promise<OrderIndexDto[]> {
    const orders: Order[] = await Order.find({
      order: { createdAt: "DESC" }
    });
    return plainToClass(OrderIndexDto, orders);
  }

  @Get("/:id")
  @Returns(NOT_FOUND, { description: "Not found" })
  @Returns(OK, { description: "OK", type: OrderGetDto })
  async get(@PathParams("id") id: number): Promise<OrderGetDto | undefined> {
    const order: Order | undefined = await Order.findOne(id);
    if (!order) throw new NotFound("Not found");
    return plainToClass(OrderGetDto, order);
  }

  @Post("/")
  @Returns(OrderGetDto)
  async create(@BodyParams("user") userId: number, @BodyParams("client") clientId: number): Promise<OrderGetDto> {
    const order: Order = new Order();
    order.user = userId;
    order.client = clientId;
    const createdOrder: Order = await order.save();
    return plainToClass(OrderGetDto, await Order.findOne(createdOrder.id));
  }

  @Put("/:id")
  @Returns(OrderGetDto)
  async update(@BodyParams() order: Order): Promise<OrderGetDto> {
    console.log(order);
    await order.save();
    return plainToClass(OrderGetDto, order);
  }

  @Delete("/:id")
  @Status(NO_CONTENT)
  async delete(@PathParams("id") id: number): Promise<void> {
    await Order.delete(id);
  }
}
