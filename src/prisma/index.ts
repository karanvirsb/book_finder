import { type Prisma, PrismaClient } from "@prisma/client";
import authors from "../model/authors.json" assert { type: "json" };
import books from "../model/books.json";
import publishers from "../model/publisher.json";
const prisma = new PrismaClient();

export default prisma;

async function main(): Promise<void> {
	console.log(await addAuthors());
}

main()
	.catch((e) => {
		console.error(e.message);
	})
	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	.finally(async () => {
		await prisma.$disconnect();
	});

async function addAuthors(): Promise<Prisma.BatchPayload> {
	const createdAuthors = await prisma.author.createMany({ data: authors });
	return createdAuthors;
}
