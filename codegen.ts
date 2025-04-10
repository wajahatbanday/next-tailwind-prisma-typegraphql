import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: `http://localhost:4000/graphql`,
  documents: ["**/*.{graphql,ts,tsx}", "!./node_modules/**/*"],
  generates: {
    "gql/": {
      // Output directory for TypeScript and React Apollo hooks
      preset: "client",
      plugins: [],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
