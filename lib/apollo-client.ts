"use client";

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    (typeof window !== "undefined"
      ? "/api/graphql" // In browser
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/graphql` // On Vercel
      : "http://localhost:3000/api/graphql"), // Local development fallback
});

const authLink = setContext((_, { headers }) => {
  // Get the token from cookies
  // const getCookie = (name: string): string | undefined => {
  //   if (typeof window === "undefined") return undefined;

  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop()?.split(";").shift();
  //   return undefined;
  // };

  // const token = getCookie("token");

  return {
    headers: {
      ...headers,
      // authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
