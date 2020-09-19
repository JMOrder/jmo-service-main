import { Exclude, Expose, Type } from "class-transformer";
import { ItemIndexDto } from "../items/dto/index.dto";

@Exclude()
export class ClientGetDto {
  @Expose() id: number;
  @Expose() name: string;
  @Expose() archived: boolean;
  @Expose() phone: string;
  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;

  @Expose()
  @Type(() => ItemIndexDto)
  items: ItemIndexDto[];
}
