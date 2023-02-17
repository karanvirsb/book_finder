import { type Books, type Author } from "@prisma/client";
import prisma from "../../prisma";

const BookDb = Object.freeze({
	getAllBooksByPageDb,
	getBooksByTitleDb,
});
export default BookDb;

interface getAllBooksByPage {
	limit: number;
	page: number;
}

async function getAllBooksByPageDb({ limit, page }: getAllBooksByPage): Promise<
	| Array<
			Books & {
				author: Author;
			}
	  >
	| undefined
> {
	try {
		const result = await prisma.books.findMany({
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
}

interface getBooksByTitle {
	limit: number;
	page: number;
	searchQuery: string;
}

async function getBooksByTitleDb({
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
		const result = await prisma.books.findMany({
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
}
