import { type Books, type Author, type PrismaClient } from "@prisma/client";
import { ZodError, z } from "zod";

const getBooksByTitleSchema = z.object({
	limit: z.number(),
	page: z.number(),
	searchQuery: z.string(),
});

export type getBooksByTitle = z.infer<typeof getBooksByTitleSchema>;

export interface IGetBooksByTitle {
	getBooksByTitleDB: ({ limit, page, searchQuery }: getBooksByTitle) => Promise<
		| Array<
				Books & {
					author: Author;
				}
		  >
		| unknown
	>;
}

export function getBooksByTitleUC({ getBooksByTitleDB }: IGetBooksByTitle) {
	return async function (groupInfo: getBooksByTitle) {
		try {
			await getBooksByTitleSchema.parseAsync(groupInfo);
			return await getBooksByTitleDB(groupInfo);
		} catch (error) {
			if (error instanceof ZodError) {
				return error.format();
			}
			return error;
		}
	};
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
