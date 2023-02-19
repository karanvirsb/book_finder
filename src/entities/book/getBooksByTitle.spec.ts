import { afterAll, describe, expect, it, vi } from "vitest";

import prisma from "../../prisma";
import { type Books, type Author } from "@prisma/client";
import makeFakeBook from "../../test/__fixtures__/books";
import {
	type IGetBooksByTitle,
	getBooksByTitleDb,
	getBooksByTitleUC,
} from "./getBooksByTitle";

const getBooksByTitle: IGetBooksByTitle["getBooksByTitleDB"] =
	getBooksByTitleDb({
		db: prisma,
	});

type getBooksByTitleReturn = Array<
	Books & {
		author: Author;
	}
>;

describe("Testing getBooksByTitle UC and DB Access", () => {
	afterAll(() => {
		vi.resetAllMocks();
	});

	it("Testing out DBAcess", async () => {
		const result = (await getBooksByTitle({
			limit: 1,
			page: 0,
			searchQuery: "The",
		})) as getBooksByTitleReturn;
		console.log(result);
		expect(result.length).toBe(1);
		expect(result[0]).toHaveProperty("author");
		expect(result[0]).toHaveProperty("asin");
	});

	it("Testing out use case", async () => {
		const getBooksByTitleMocked = vi.fn(getBooksByTitle);
		const fakeBook = makeFakeBook();
		getBooksByTitleMocked.mockResolvedValueOnce([fakeBook]);

		// intializing use case
		const getAllBooksByPageUseCase = getBooksByTitleUC({
			getBooksByTitleDB: getBooksByTitleMocked,
		});

		const result = (await getAllBooksByPageUseCase({
			limit: 1,
			page: 0,
			searchQuery: "The",
		})) as getBooksByTitleReturn;
		console.log(result);
		expect(result[0]).toMatchObject(fakeBook);
	});
});
