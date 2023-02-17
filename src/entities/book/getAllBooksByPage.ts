import { type PrismaClient, type Books, type Author } from "@prisma/client";

export interface getAllBooksByPageDependencies {
	db: PrismaClient;
}

export interface getAllBooksByPage {
	limit: number;
	page: number;
}

export function getAllBooksByPageDb({ db }: getAllBooksByPageDependencies) {
	return async function ({ limit, page }: getAllBooksByPage): Promise<
		| Array<
				Books & {
					author: Author;
				}
		  >
		| undefined
	> {
		try {
			const result = await db.books.findMany({
				take: limit,
				skip: page * limit,
				include: {
					author: true,
				},
			});

			return result;
		} catch (error) {
			console.log(error);
		}
	};
}
