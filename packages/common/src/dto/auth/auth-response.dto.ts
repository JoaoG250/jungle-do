import { User } from "@repo/db";

export type RegisterResponse = User;

export interface LoginResponse {
  accessToken: string;
}
