import {
	type Author,
	type Books,
	type Publisher,
	type PrismaClient,
} from "@prisma/client";

interface getABookDBADeps {
	db: PrismaClient;
}
export default function makeGetABookDBA({ db }: getABookDBADeps) {
	return async function getABookDBA({
		id,
	}: {
		id: string;
	}): Promise<
		Result<(Books & { author: Author; publisher: Publisher }) | null>
	> {
		try {
			const result = await db.books.findFirst({
				where: { asin: id },
				include: { author: true, publisher: true },
			});
			if (result !== null) {
				return {
					success: true,
					data: result,
				};
			} else {
				return {
					success: false,
					error: `Could not find the Book.`,
				};
			}
		} catch (error) {
			return {
				success: false,
				error,
			};
		}
	};
}
