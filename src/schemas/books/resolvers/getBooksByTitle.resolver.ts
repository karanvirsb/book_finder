import { GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import { type resolver } from "../../types/resolvers";
import BookType from "../typedef/book-typedef";
import prisma from "../../../prisma";

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
	async resolve(_, { limit, page, searchQuery }: args) {
		await prisma.books.findMany({
			skip: page * limit,
			take: limit,
			include: {
				author: true,
			},
			where: { title: { contains: searchQuery } },
		});
	},
};

export default getBooksByTitleResolver;
