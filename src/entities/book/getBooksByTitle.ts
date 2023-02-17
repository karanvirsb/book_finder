import { type Books, type Author, type PrismaClient } from "@prisma/client";

export interface getBooksByTitleDbDependency {
	db: PrismaClient;
}

export interface getBooksByTitle {
	limit: number;
	page: number;
	searchQuery: string;
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
		| undefined
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
		}
	};
}
