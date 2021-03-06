import { Exclude, Expose, Type } from "class-transformer";
import { ClientIndexDto } from "src/clients/dto/index.dto";
import { UserIndexDto } from "src/users/dto/Index.dto";

@Exclude()
export class OrderIndexDto {
  @Expose() id: string;

  @Expose()
  @Type(() => UserIndexDto)
  user: UserIndexDto;

  @Expose()
  @Type(() => ClientIndexDto)
  client: ClientIndexDto;

  @Expose() createdAt: Date;
}
