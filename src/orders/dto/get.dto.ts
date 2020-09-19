import { Exclude, Expose, Type } from "class-transformer";
import { ClientGetDto } from "src/clients/dto/get.dto";
import { OrderItemOrderContentDto } from "src/order-items/dto/order-content.dto";
import { UserIndexDto } from "src/users/dto/Index.dto";

@Exclude()
export class OrderGetDto {
  @Expose() id: string;

  @Expose()
  @Type(() => UserIndexDto)
  user: UserIndexDto;

  @Expose()
  @Type(() => ClientGetDto)
  client: ClientGetDto;

  @Expose()
  @Type(() => OrderItemOrderContentDto)
  orderItems: OrderItemOrderContentDto[];

  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;
}
