import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

const PublisherType = new GraphQLObjectType({
	name: "publisher",
	fields: {
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		phone: { type: GraphQLString },
	},
});

export default PublisherType;
