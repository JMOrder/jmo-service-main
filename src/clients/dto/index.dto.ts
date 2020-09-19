import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ClientIndexDto {
  @Expose() id: number;
  @Expose() name: string;
  @Expose() archived: boolean;
  @Expose() phone: string;
}
