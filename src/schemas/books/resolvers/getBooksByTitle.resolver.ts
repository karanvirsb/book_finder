import { GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import { type resolver } from "../../types/resolvers";
import BookType from "../typedef/book-typedef";
import prisma from "../../../prisma";

interface args {
	limit: number;
	page: number;
	title: string;
}

const getBooksByTitleResolver: resolver = {
	type: new GraphQLList(BookType),
	args: {
		limit: { type: GraphQLInt },
		page: { type: GraphQLInt },
		title: { type: GraphQLString },
	},
	async resolve(_, { limit, page, title }: args) {
		await prisma.books.findMany({
			skip: page * limit,
			take: limit,
			where: { title: { contains: title } },
		});
	},
};

export default getBooksByTitleResolver;
