import { Router, RouterContext } from "https://deno.land/x/oak/mod.ts";
import {
  applyGraphQL,
  gql,
  GQLError,
} from "https://deno.land/x/oak_graphql/mod.ts";

const typeDefs = (gql as any)`
    type User {
        username: String!
        email: String!
        password: String!
    }

    type Query {
    users: [User]!
    }

    type Mutation {
        signup(username: String!, email: String!, password: String!): User
    }
`;

const users = [{ username: "Jane", email: "jane@test.com", password: "abc" }];

// Resolvers
const resolvers = {
  Query: {
    users: () => users,
  },
  Mutation: {
    signup: (
      parent: any,
      args: { username: string; email: string; password: string },
      ctx: any,
      info: any,
    ) => {
      const newUser = args;
      users.push(newUser);
      return newUser;
    },
  },
};

export const GraphQLService = await applyGraphQL<Router>({
  Router,
  typeDefs,
  resolvers,
});
