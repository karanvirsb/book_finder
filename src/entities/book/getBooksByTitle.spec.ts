import { afterAll, describe, expect, it, vi } from "vitest";

import prisma from "../../prisma";
import { type Books, type Author } from "@prisma/client";
import makeFakeBook from "../../test/__fixtures__/books";
import {
	type IGetBooksByTitle,
	getBooksByTitleDb,
	getBooksByTitleUC,
	type getBooksByTitleDbReturn,
} from "./getBooksByTitle";

const getBooksByTitle: IGetBooksByTitle["getBooksByTitleDB"] =
	getBooksByTitleDb({
		db: prisma,
	});

describe("Testing getBooksByTitle UC and DB Access", () => {
	afterAll(() => {
		vi.resetAllMocks();
	});

	it("Testing out DBAcess", async () => {
		const result = (await getBooksByTitle({
			limit: 1,
			page: 0,
			searchQuery: "The",
		})) as getBooksByTitleDbReturn;
		console.log(result);
		expect(result.books.length >= 1).toBeTruthy();
		expect(result.books[0]).toHaveProperty("author");
		expect(result.books[0]).toHaveProperty("asin");
		expect(result.count > 1).toBeTruthy();
	});

	it("Testing out use case", async () => {
		const getBooksByTitleMocked = vi.fn(getBooksByTitle);
		const fakeBook = makeFakeBook();
		getBooksByTitleMocked.mockResolvedValueOnce({
			books: [fakeBook],
			count: 1,
		});

		// intializing use case
		const getAllBooksByPageUseCase = getBooksByTitleUC({
			getBooksByTitleDB: getBooksByTitleMocked,
		});

		const result = (await getAllBooksByPageUseCase({
			limit: 1,
			page: 0,
			searchQuery: "The",
		})) as getBooksByTitleDbReturn;
		console.log(result);
		expect(result.books[0]).toMatchObject(fakeBook);
		expect(result.count).toBe(1);
	});
});
