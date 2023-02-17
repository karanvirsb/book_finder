import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import bookResolvers from "./books/resolvers";

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		getHelloWorld: {
			type: GraphQLString,
			args: {},
			resolve(_, args) {
				return "Hello World";
			},
		},
		...bookResolvers,
	},
});

export default new GraphQLSchema({ query: RootQuery });
