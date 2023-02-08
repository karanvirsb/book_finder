import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

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
	},
});

export default new GraphQLSchema({ query: RootQuery });
