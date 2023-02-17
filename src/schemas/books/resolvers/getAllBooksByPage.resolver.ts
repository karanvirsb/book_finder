import { GraphQLList, GraphQLInt } from "graphql";
import prisma from "../../../prisma";
import BookType from "../typedef/book-typedef";
import { type resolver } from "../../types/resolvers";

const getAllBooksByPage: resolver = {
	type: new GraphQLList(BookType),
	args: { limit: { type: GraphQLInt }, page: { type: GraphQLInt } },
	async resolve(_, args) {
		return await prisma.books.findMany({
			take: args.limit,
			skip: args.page * args.limit,
			include: {
				author: true,
			},
		});
	},
};

export default getAllBooksByPage;
