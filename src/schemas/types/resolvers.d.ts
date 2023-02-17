import {
	type GraphQLType,
	GraphQLTypeResolver,
	type GraphQLFieldResolver,
} from "graphql";

export interface resolver {
	type: GraphQLType;
	args: any;
	resolve: GraphQLFieldResolver<any, any, any, unknown> | undefined;
}
