import { type GraphQLFieldResolver } from "graphql";

export interface resolver {
	type: GraphQLOutputType;
	args: any;
	resolve: GraphQLFieldResolver<any, any, any, unknown> | undefined;
}
