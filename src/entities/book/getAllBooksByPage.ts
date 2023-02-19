import { type PrismaClient, type Books, type Author } from "@prisma/client";
import { ZodError, z } from "zod";

const getAllBooksByPageSchema = z.object({
	limit: z.number(),
	page: z.number(),
});

export type getAllBooksByPage = z.infer<typeof getAllBooksByPageSchema>;

export interface IGetAllBooksByPageDb {
	getAllBooksByPageDb: ({ limit, page }: getAllBooksByPage) => Promise<
		| Array<
				Books & {
					author: Author;
				}
		  >
		| unknown
	>;
}

export function getAllBooksByPageUC({
	getAllBooksByPageDb,
}: IGetAllBooksByPageDb) {
	return async function ({ limit, page }: getAllBooksByPage) {
		try {
			await getAllBooksByPageSchema.parseAsync({ limit, page });
			return await getAllBooksByPageDb({ limit, page });
		} catch (error) {
			if (error instanceof ZodError) {
				return error.format();
			}
			return error;
		}
	};
}

export interface getAllBooksByPageDependencies {
	db: PrismaClient;
}

export function getAllBooksByPageDb({ db }: getAllBooksByPageDependencies) {
	return async function ({ limit, page }: getAllBooksByPage): Promise<
		| Array<
				Books & {
					author: Author;
				}
		  >
		| unknown
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
			return error;
		}
	};
}
