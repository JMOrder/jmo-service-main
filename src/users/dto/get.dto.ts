import { Expose, Exclude } from "class-transformer";
@Exclude()
export class UserGetDto {
  @Expose() id: number;
  @Expose() email: string;
  @Expose() phone: string;
  @Expose() firstName: string;
  @Expose() lastName: string;
  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;
}
