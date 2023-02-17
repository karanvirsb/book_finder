import {
	GraphQLFloat,
	GraphQLInt,
	GraphQLList,
	GraphQLObjectType,
	GraphQLString,
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import AuthorType from "../../author/typedefs/author-typedef";
import PublisherType from "../../publisher/typedefs/publisher-typedef";

const BookType = new GraphQLObjectType({
	name: "book",
	fields: {
		asin: { type: GraphQLString },
		ISBN10: { type: GraphQLString },
		author: { type: AuthorType },
		currency: { type: GraphQLString },
		description: { type: GraphQLString },
		final_price: { type: GraphQLFloat },
		format: { type: GraphQLJSON },
		image_url: { type: GraphQLString },
		images_count: { type: GraphQLInt },
		item_weight: { type: GraphQLString },
		product_dimensions: { type: GraphQLString },
		rating: { type: GraphQLString },
		reviews_count: { type: GraphQLInt },
		publisher_id: { type: PublisherType },
		title: { type: GraphQLString },
		url: { type: GraphQLString },
		categories: { type: new GraphQLList(GraphQLString) },
	},
});

export default BookType;
