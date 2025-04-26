import { graphql } from "@/gql";
import { QueryMode, UsersQueryVariables } from "@/gql/graphql";
import { useQuery } from "@apollo/client";

const USERS = graphql(`
  query Users($where: UserWhereInput) {
    users(where: $where) {
      id
      name
      email
      password
      role
      createdAt
      updatedAt
    }
  }
`);

export const useUsers = (searchTerm?: string) => {
  const variables: UsersQueryVariables = {};

  if (searchTerm && searchTerm.trim() !== "") {
    variables.where = {
      name: {
        contains: searchTerm,
        mode: QueryMode.Insensitive,
      },
    };
  }

  const { data, loading, error, refetch } = useQuery(USERS, {
    variables,
  });
  return { users: data?.users || [], loading, error, refetch };
};
