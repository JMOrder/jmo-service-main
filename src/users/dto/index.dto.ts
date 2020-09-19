import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UserIndexDto {
  @Expose() id: number;
  @Expose() email: string;
  @Expose() firstName: string;
  @Expose() lastName: string;
}
