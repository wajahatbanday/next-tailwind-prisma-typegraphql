"use client";

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    (typeof window !== "undefined"
      ? "/api/graphql" // In browser
      : "http://localhost:3000/api/graphql"),
});

const authLink = setContext((_, { headers }) => {
  //   const token = localStorage.getItem("farm2i-token");
  return {
    headers: {
      ...headers,
      //   authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
