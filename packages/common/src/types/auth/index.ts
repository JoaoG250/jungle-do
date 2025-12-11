export interface JwtPayload {
  sub: string;
  email: string;
  username: string;
}

export interface AuthUser {
  id: string;
  email: string;
  username: string;
}
