import { GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import { type resolver } from "../../types/resolvers";
import BookType from "../typedef/book-typedef";
import prisma from "../../../prisma";
import BookDb from "../../../entities/book/db";

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
	async resolve(_, args: args) {
		return await BookDb.getBooksByTitleDb(args);
	},
};

export default getBooksByTitleResolver;
