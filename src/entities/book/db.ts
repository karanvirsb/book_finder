import { type Books, type Author, type PrismaClient } from "@prisma/client";
import prisma from "../../prisma";

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
