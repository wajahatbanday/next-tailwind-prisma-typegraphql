import "reflect-metadata";
import { resolvers } from "../../prisma/generated/type-graphql";
import { buildSchema } from "type-graphql";
import { customResolvers } from "./resolvers";

export const createSchema = async () => {
  return await buildSchema({
    resolvers: [...resolvers, ...customResolvers],
    validate: false,
  });
};
