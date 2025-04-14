/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMiddleware } from "type-graphql";
import { GraphQLError } from "graphql";
import { verify } from "jsonwebtoken";
import { Role } from "@prisma/client";
import { GenericRequest, JwtPayload, NextFn } from "./auth.types";

// Get authorization header from either Next.js or Express request
const getAuthHeader = (req: GenericRequest): string | null => {
  // Next.js Request (headers is an object with get method)
  if (typeof req.headers.get === "function") {
    return req.headers.get("authorization");
  }

  // Express Request (headers is a plain object)
  return req.headers.authorization || null;
};

// Base authentication function
const authenticate = async (context: any): Promise<JwtPayload> => {
  try {
    // Get the authorization header from the request
    const authHeader = getAuthHeader(context.req);

    if (!authHeader) {
      throw new GraphQLError("Unauthorized", {
        extensions: {
          code: "UNAUTHORIZED",
        },
      });
    }

    // Extract the token from the Bearer token
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new GraphQLError("Invalid auth format, expected Bearer token", {
        extensions: {
          code: "UNAUTHORIZED",
        },
      });
    }

    // Verify the token
    const JWT_SECRET = process.env.JWT_SECRET || "01JRA9P0477E27WJ5Y05F093B1";
    const payload = verify(token, JWT_SECRET) as JwtPayload;

    // Verify user exists in database
    const user = await context.prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      throw new GraphQLError("Unauthorized", {
        extensions: {
          code: "UNAUTHORIZED",
        },
      });
    }

    // Verify that the role in token matches the role in database
    if (user.role !== payload.role) {
      throw new GraphQLError("Unauthorized", {
        extensions: {
          code: "UNAUTHORIZED",
        },
      });
    }

    // Set the user in the context
    context.user = {
      id: payload.userId,
      role: payload.role,
    };

    return payload;
  } catch (error) {
    console.error("Authentication error:", error);
    throw new GraphQLError("Unauthorized", {
      extensions: {
        code: "UNAUTHORIZED",
        http: { status: 401 },
      },
    });
  }
};

// Role checker middleware
const checkRole =
  (role: Role) =>
  async ({ context }: { context: any }, next: NextFn) => {
    // First authenticate the user
    const payload = await authenticate(context);

    // Then check if they have the required role
    if (role && payload.role !== role) {
      throw new GraphQLError(`Access Denied`, {
        extensions: {
          code: "FORBIDDEN",
          http: { status: 403 },
        },
      });
    }

    return next();
  };

// Create a decorator that checks for a specific role
export function AuthGuard(role: Role) {
  return UseMiddleware(checkRole(role));
}

// Add this function to the authGuard.ts file
export function MultiRoleAuthGuard(...roles: Role[]) {
  return UseMiddleware(async ({ context }: { context: any }, next: NextFn) => {
    // Authenticate the user
    const payload = await authenticate(context);

    // Check if user has any of the specified roles
    if (roles.length > 0 && !roles.includes(payload.role)) {
      throw new GraphQLError(`Access Denied`, {
        extensions: {
          code: "FORBIDDEN",
          http: { status: 403 },
        },
      });
    }

    return next();
  });
}
