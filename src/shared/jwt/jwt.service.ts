import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { UserEntity } from "src/entity/user.entity";
import { JWT_AUTH_TOKEN_OPTIONS } from "./jwt.constants";

@Injectable()
export class JwtService {
  readonly JWT_RSA_PUBLIC_KEY = process.env.RSA_PUBLIC_KEY.replace(/\\n/gm, '\n');

  async getUser(token: string): Promise<UserEntity> {
    const username = this.getUsername(token);
    return UserEntity.findByPhone(username);
  }
  private getUsername(token: string): string {
    const { sub: username } = <Record<string, unknown>> jwt.verify(token, this.JWT_RSA_PUBLIC_KEY, JWT_AUTH_TOKEN_OPTIONS);
    return <string>username;
  }
}
