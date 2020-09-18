import { Exclude, Expose, Type } from "class-transformer";
import { Property } from "@tsed/common";
import { UserIndexDto } from "./UserDto";
import { ClientIndexDto, ClientGetDto } from "./ClientDto";
import { FromOrderToItemDto } from "./OrderItemDto";

@Exclude()
export class OrderGetDto {
  @Expose() @Property() id: string;

  @Expose()
  @Type(() => UserIndexDto)
  @Property()
  user: UserIndexDto;

  @Expose()
  @Type(() => ClientGetDto)
  @Property()
  client: ClientGetDto;

  @Expose()
  @Type(() => FromOrderToItemDto)
  @Property()
  orderItems: FromOrderToItemDto[];

  @Expose() @Property() createdAt: Date;
  @Expose() @Property() updatedAt: Date;
}

@Exclude()
export class OrderIndexDto {
  @Expose() @Property() id: string;

  @Expose()
  @Type(() => UserIndexDto)
  @Property()
  user: UserIndexDto;

  @Expose()
  @Type(() => ClientIndexDto)
  @Property()
  client: ClientIndexDto;

  @Expose() @Property() createdAt: Date;
}
