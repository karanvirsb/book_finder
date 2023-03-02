import { GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import { type resolver } from "../../types/resolvers";
import BookType from "../typedef/book-typedef";
import { getBooksByTitleUseCase } from "../../../entities/book";
import { type getBooksByTitleReturn } from "../../../entities/book/getBooksByTitle";

interface args {
	limit: number;
	page: number;
	searchQuery: string;
}

const getBooksByTitleResolver: resolver = {
	type: new GraphQLList(BookType),
	args: {
		limit: { type: GraphQLInt },
		page: { type: GraphQLInt },
		searchQuery: { type: GraphQLString },
	},
	async resolve(_, args: args): Promise<getBooksByTitleReturn> {
		return await getBooksByTitleUseCase(args);
	},
};

export default getBooksByTitleResolver;
