import {
	type Author,
	type Books,
	type Publisher,
	type PrismaClient,
} from "@prisma/client";
import { z } from "zod";

type getABookReturn = (Books & { author: Author; publisher: Publisher }) | null;
type GetABookDBA = ({ id }: { id: string }) => Promise<Result<getABookReturn>>;

const getABookSchema = z.object({ id: z.string().min(10) });
type getABookProps = z.infer<typeof getABookSchema>;

export function makeGetABookUC({ getABookDBA }: { getABookDBA: GetABookDBA }) {
	return async function getABookUC({
		id,
	}: getABookProps): Promise<Result<getABookReturn>> {
		try {
			await getABookSchema.safeParseAsync({ id });
			return await getABookDBA({ id });
		} catch (error) {
			return {
				success: false,
				error,
			};
		}
	};
}

interface getABookDBADeps {
	db: PrismaClient;
}
export function makeGetABookDBA({ db }: getABookDBADeps) {
	return async function getABookDBA({
		id,
	}: {
		id: string;
	}): Promise<Result<getABookReturn>> {
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
