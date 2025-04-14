import { Role } from "@prisma/client";

export interface JwtPayload {
  userId: string;
  role: Role;
  iat: number;
  exp: number;
}

// Define a generic request interface that works with both Next.js and Express
export interface GenericRequest {
  headers: {
    get?(name: string): string | null;
    authorization?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

// Define the next function type
export type NextFn = () => Promise<unknown>;
