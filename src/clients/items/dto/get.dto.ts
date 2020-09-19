import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ItemGetDto {
  @Expose() id: number;

  @Expose() name: string;

  @Expose() unitName: string;

  @Expose() quantityName: string;

  @Expose() comment: string;
}
