import { type Books, type Author, type PrismaClient } from "@prisma/client";
import { TypeOf, z } from "zod";

const getBooksByTitleSchema = z.object({
	limit: z.number(),
	page: z.number(),
	searchQuery: z.string(),
});

export type getBooksByTitle = z.infer<typeof getBooksByTitleSchema>;

export interface GetBooksByTitleUCDependency {
	getBooksByTitle: ({ limit, page, searchQuery }: getBooksByTitle) => Promise<
		| Array<
				Books & {
					author: Author;
				}
		  >
		| unknown
	>;
}

export function getBooksByTitleUC({
	getBooksByTitle,
}: GetBooksByTitleUCDependency) {
	return async function () {};
}

export interface getBooksByTitleDbDependency {
	db: PrismaClient;
}

export function getBooksByTitleDb({ db }: getBooksByTitleDbDependency) {
	return async function ({
		limit,
		page,
		searchQuery,
	}: getBooksByTitle): Promise<
		| Array<
				Books & {
					author: Author;
				}
		  >
		| unknown
	> {
		try {
			const result = await db.books.findMany({
				skip: page * limit,
				take: limit,
				include: {
					author: true,
				},
				where: { title: { contains: searchQuery } },
			});

			return result;
		} catch (error) {
			console.log(error);
			return error;
		}
	};
}
