import { string } from "zod";

export type JwtToken = {
  AccessToken: string;
  RefreshToken: string;
  TokenType: string;
  ExpiresAt: string;
};

export type JwtTokenWithEmail = {
  Email: string;
} & JwtToken;
