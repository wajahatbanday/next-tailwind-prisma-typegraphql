import { createSchema } from "@/lib/graphql/schema";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

// Use an async initialization function instead of top-level await
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let handler: any = null;

const initializeApolloServer = async () => {
  const schema = await createSchema();
  const server = new ApolloServer({
    schema,
    introspection: true, // Enable introspection for Apollo Studio
  });

  return startServerAndCreateNextHandler(server, {
    context: async (req) => ({
      prisma,
      req,
    }),
  });
};

// Initialize the handler immediately
initializeApolloServer().then((initializedHandler) => {
  handler = initializedHandler;
});

// Helper function to add CORS headers
function addCorsHeaders(response: Response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}

// Export request handlers that use the initialized handler
export async function GET(req: NextRequest) {
  if (!handler) {
    handler = await initializeApolloServer();
  }
  const response = await handler(req);
  return addCorsHeaders(response);
}

export async function POST(req: NextRequest) {
  if (!handler) {
    handler = await initializeApolloServer();
  }
  const response = await handler(req);
  return addCorsHeaders(response);
}

export async function OPTIONS() {
  return addCorsHeaders(new Response(null, { status: 204 }));
}
