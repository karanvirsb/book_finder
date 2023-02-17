import { GraphQLList, GraphQLInt } from "graphql";
import BookType from "../typedef/book-typedef";
import { type resolver } from "../../types/resolvers";
import { getAllBooksByPageUseCase } from "../../../entities/book";

interface args {
	limit: number;
	page: number;
}

const getAllBooksByPage: resolver = {
	type: new GraphQLList(BookType),
	args: { limit: { type: GraphQLInt }, page: { type: GraphQLInt } },
	async resolve(_, args: args) {
		return await getAllBooksByPageUseCase(args);
	},
};

export default getAllBooksByPage;
