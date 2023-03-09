import { GraphQLString } from "graphql";
import { type resolver } from "../../types/resolvers";
import BookType from "../typedef/book-typedef";
import prisma from "../../../prisma";
import { getABookUC } from "../../../entities/book";

interface args {
	id: string;
}

const getABook: resolver = {
	type: BookType,
	args: { id: { type: GraphQLString } },
	async resolve(_, { id }: args) {
		return await getABookUC({ id });
	},
};

export default getABook;
