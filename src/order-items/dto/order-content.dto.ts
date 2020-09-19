import { Expose, Type } from "class-transformer";
import { ItemIndexDto } from "src/clients/items/dto/index.dto";

export class OrderItemOrderContentDto {
  @Expose()
  id: number;

  @Expose()
  @Type(() => ItemIndexDto)
  item: ItemIndexDto;

  @Expose() unitAmount: number;
  @Expose() quantity: number;
  @Expose() comment: string;
}
