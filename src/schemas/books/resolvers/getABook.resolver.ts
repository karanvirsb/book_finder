import { GraphQLString } from "graphql";
import { type resolver } from "../../types/resolvers";
import { getABookUC } from "../../../entities/book";
import BookType from "../typedef/book-typedef";

interface args {
	id: string;
}

const getABook: resolver = {
	type: BookType,
	args: { id: { type: GraphQLString } },
	async resolve(_, { id }: args) {
		const res = await getABookUC({ id: id.trim() });
		if (res.success) {
			return res.data;
		} else {
			return res.error;
		}
	},
};

export default getABook;
