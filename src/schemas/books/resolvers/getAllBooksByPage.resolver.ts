import { GraphQLList, GraphQLInt } from "graphql";
import BookType from "../typedef/book-typedef";
import { type resolver } from "../../types/resolvers";
import BookDb from "../../../entities/book/db";

interface args {
	limit: number;
	page: number;
}

const getAllBooksByPage: resolver = {
	type: new GraphQLList(BookType),
	args: { limit: { type: GraphQLInt }, page: { type: GraphQLInt } },
	async resolve(_, args: args) {
		return await BookDb.getAllBooksByPageDb(args);
	},
};

export default getAllBooksByPage;
