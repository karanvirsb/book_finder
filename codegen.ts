import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	overwrite: true,
	schema: "http://localhost:3000/api/graphql",
	generates: {
		"src/generated/graphql.ts": {
			plugins: ["typescript", "typescript-document-nodes"],
		},
	},
};

export default config;
