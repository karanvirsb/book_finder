import {
	type Author,
	type Books,
	type Publisher,
	type PrismaClient,
} from "@prisma/client";
import { z } from "zod";

const getABookSchema = z.object({ id: z.string().min(10) });
type getABookProps = z.infer<typeof getABookSchema>;

export function makeGetABookUC() {
	return async function getABookUC({ id }: getABookProps) {};
}

interface getABookDBADeps {
	db: PrismaClient;
}
export function makeGetABookDBA({ db }: getABookDBADeps) {
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
