import { GraphQLString } from "graphql";
import { type resolver } from "../../types/resolvers";
import BookType from "../typedef/book-typedef";
import prisma from "../../../prisma";

interface args {
	id: string;
}

const getABook: resolver = {
	type: BookType,
	args: { id: GraphQLString },
	async resolve(_, { id }: args) {
		return await prisma.books.findFirst({
			where: { asin: id },
			include: { author: true, publisher: true },
		});
	},
};

export default getABook;
