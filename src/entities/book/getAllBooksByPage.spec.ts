import { afterAll, describe, expect, it, vi } from "vitest";
import {
	type IGetAllBooksByPageDb,
	getAllBooksByPageDb,
	getAllBooksByPageUC,
} from "./getAllBooksByPage";
import prisma from "../../prisma";
import { type Books, type Author } from "@prisma/client";
import makeFakeBook from "../../test/__fixtures__/books";

const getAllBooksByPageDbAccess: IGetAllBooksByPageDb["getAllBooksByPageDb"] =
	getAllBooksByPageDb({
		db: prisma,
	});

type getAllBooksByPageReturn = Array<
	Books & {
		author: Author;
	}
>;

describe("Tesing getAllBooksByPage UC and DB Access", () => {
	afterAll(() => {
		vi.resetAllMocks();
	});

	it("Testing out DBAcess", async () => {
		const result = (await getAllBooksByPageDbAccess({
			limit: 1,
			page: 0,
		})) as getAllBooksByPageReturn;
		console.log(result);
		expect(result.length).toBe(1);
		expect(result[0]).toHaveProperty("author");
		expect(result[0]).toHaveProperty("asin");
	});

	it("Testing out use case", async () => {
		const getAllBooksByPageDBAccessMocked = vi.fn(getAllBooksByPageDbAccess);
		const fakeBook = makeFakeBook();
		getAllBooksByPageDBAccessMocked.mockResolvedValueOnce([fakeBook]);

		// intializing use case
		const getAllBooksByPageUseCase = getAllBooksByPageUC({
			getAllBooksByPageDb: getAllBooksByPageDBAccessMocked,
		});

		const result = (await getAllBooksByPageUseCase({
			limit: 1,
			page: 0,
		})) as getAllBooksByPageReturn;
		console.log(result);
		expect(result[0]).toMatchObject(fakeBook);
	});
});
