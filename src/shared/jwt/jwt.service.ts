import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as jwt from "jsonwebtoken";
import { UserEntity } from "src/entity/user.entity";
import { JWT_AUTH_TOKEN_OPTIONS } from "./jwt.constants";

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  async getUser(token: string): Promise<UserEntity> {
    const username = this.getUsername(token);
    return UserEntity.findByPhone(username);
  }

  private getUsername(token: string): string {
    const SERVICE_RSA_PUBLIC_KEY: string = this.configService.get('SERVICE_RSA_PUBLIC_KEY')
    const { sub: username } = <Record<string, unknown>> jwt.verify(token, SERVICE_RSA_PUBLIC_KEY, JWT_AUTH_TOKEN_OPTIONS);
    return <string>username;
  }
}
