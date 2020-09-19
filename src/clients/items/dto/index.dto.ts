import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ItemIndexDto {
  @Expose() id: number;

  @Expose() name: string;

  @Expose() unitName: string;

  @Expose() quantityName: string;
}
