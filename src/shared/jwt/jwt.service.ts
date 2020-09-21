import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { UserEntity } from "src/entity/user.entity";

@Injectable()
export class JwtService {
  getUser(token: string): Promise<UserEntity> {
    const email = this.getEmail(token);
    return UserEntity.findByEmail(email);
  }
  private getEmail(token: string): string {
    const { sub: email } = jwt.decode(token);
    console.log(email);
    return email;
  }
}
