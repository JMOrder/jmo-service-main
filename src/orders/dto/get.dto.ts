import { Exclude, Expose, Type } from "class-transformer";
import { ClientGetDto } from "src/clients/dto/get.dto";
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

  // @Expose()
  // @Type(() => FromOrderToItemDto)
  // orderItems: FromOrderToItemDto[];

  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;
}
