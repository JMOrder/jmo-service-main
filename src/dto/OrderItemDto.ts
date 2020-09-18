import { Expose, Type } from "class-transformer";
import { Property } from "@tsed/common";

import { ItemIndexDto } from "./ItemDto";

export class FromOrderToItemDto {
  @Expose()
  @Property()
  id: number;

  @Expose()
  @Type(() => ItemIndexDto)
  @Property()
  item: ItemIndexDto;

  @Expose() @Property() unitAmount: number;
  @Expose() @Property() quantity: number;
  @Expose() @Property() comment: string;
}
