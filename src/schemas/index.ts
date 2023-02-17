import {
	GraphQLInt,
	GraphQLList,
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
} from "graphql";
import BookType from "./books/typedef/book-typedef";
import prisma from "../prisma";

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		getHelloWorld: {
			type: GraphQLString,
			args: {},
			resolve(_, args) {
				return "Hello World";
			},
		},
		getAllBooksByPage: {
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
		},
	},
});

export default new GraphQLSchema({ query: RootQuery });
