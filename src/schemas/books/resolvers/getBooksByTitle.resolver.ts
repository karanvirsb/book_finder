import {
	GraphQLInt,
	GraphQLList,
	GraphQLObjectType,
	GraphQLString,
} from "graphql";
import { type resolver } from "../../types/resolvers";
import BookType from "../typedef/book-typedef";
import { getBooksByTitleUseCase } from "../../../entities/book";
import { getBooksByTitleDb } from "../../../entities/book/getBooksByTitle";

interface args {
	limit: number;
	page: number;
	searchQuery: string;
}

const GetBooksByTitlePayload = new GraphQLObjectType({
	name: "GetBooksByTitlePayload",
	fields: () => ({
		books: { type: new GraphQLList(BookType) },
		count: { type: GraphQLInt },
	}),
});

const getBooksByTitleResolver: resolver = {
	type: GetBooksByTitlePayload,
	args: {
		limit: { type: GraphQLInt },
		page: { type: GraphQLInt },
		searchQuery: { type: GraphQLString },
	},
	async resolve(_, args: args) {
		return await getBooksByTitleUseCase(args);
	},
};

export default getBooksByTitleResolver;
