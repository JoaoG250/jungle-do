import { Injectable, Inject, OnModuleInit } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { User } from "@repo/db";
import {
  RABBITMQ_CLIENTS,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@repo/common/constants";
import { AuthUser, JwtPayload } from "@repo/common/types/auth";

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject(RABBITMQ_CLIENTS.AUTH_SERVICE) private client: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async onModuleInit() {
    await this.client.connect();
  }

  async validateUser(email: string, pass: string): Promise<User | null> {
    return firstValueFrom(
      this.client.send<User | null>("auth.validate_user", { email, pass }),
    );
  }

  async createUser(
    username: string,
    email: string,
    pass: string,
  ): Promise<User> {
    return firstValueFrom(
      this.client.send<User>("auth.create_user", { username, email, pass }),
    );
  }

  async login(user: AuthUser) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET as string,
        expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME as any,
      }),
    };
  }

  getCookieWithJwtRefreshToken(refreshToken: string) {
    return `${REFRESH_TOKEN_COOKIE_NAME}=${refreshToken}; HttpOnly; Path=/auth/refresh; Max-Age=${process.env.JWT_REFRESH_EXPIRATION_TIME}`;
  }

  getCookieForLogOut() {
    return `${REFRESH_TOKEN_COOKIE_NAME}=; HttpOnly; Path=/auth/refresh; Max-Age=0`;
  }

  async verifyRefreshToken(refreshToken: string): Promise<JwtPayload | null> {
    try {
      return this.jwtService.verify<JwtPayload>(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch {
      return null;
    }
  }
}
