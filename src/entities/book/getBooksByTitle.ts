import { type Books, type Author, type PrismaClient } from "@prisma/client";
import { ZodError, z } from "zod";

const getBooksByTitleSchema = z.object({
	limit: z.number(),
	page: z.number(),
	searchQuery: z.string(),
});

export type getBooksByTitle = z.infer<typeof getBooksByTitleSchema>;

export interface getBooksByTitleReturn {
	books: Array<
		Books & {
			author: Author;
		}
	>;
	count: number;
}

export interface IGetBooksByTitle {
	getBooksByTitleDB: ({
		limit,
		page,
		searchQuery,
	}: getBooksByTitle) => Promise<getBooksByTitleReturn>;
}

export function getBooksByTitleUC({ getBooksByTitleDB }: IGetBooksByTitle) {
	return async function (groupInfo: getBooksByTitle) {
		try {
			await getBooksByTitleSchema.parseAsync(groupInfo);
		} catch (error) {
			if (error instanceof ZodError) {
				throw new ZodError(error.issues);
			}
		}
		return await getBooksByTitleDB(groupInfo);
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
	}: getBooksByTitle): Promise<getBooksByTitleReturn> {
		let result, totalCount;
		try {
			result = await db.books.findMany({
				skip: page * limit,
				take: limit,
				include: {
					author: true,
				},
				where: { title: { contains: searchQuery } },
			});
			totalCount = await db.books.count({
				where: { title: { contains: searchQuery } },
			});
			return { books: result, count: totalCount };
		} catch (error) {
			if (error instanceof Error) {
				console.log(error);
				throw new Error(error.message);
			}
		}
	};
}
