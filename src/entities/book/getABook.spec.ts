import { afterAll, describe, expect, it, vi } from "vitest";
import {
	type getABookProps,
	makeGetABookDBA,
	makeGetABookUC,
} from "./getABook";
import prisma from "../../prisma";
import { makeFakeBookWithAuthorAndPublisher } from "../../test/__fixtures__/books";
import { type ZodError } from "zod";

describe("Testing out getABookDBA", () => {
	const getABookDBA = makeGetABookDBA({ db: prisma });
	it("SUCCESS: Getting a book", async () => {
		const result = await getABookDBA({ id: "006235373X" });
		expect(result.success).toBeTruthy();
		if (result.success) {
			expect(result.data?.asin).toBe("006235373X");
		}
	});

	it("ERROR: Cannot find a book", async () => {
		const result = await getABookDBA({ id: "" });
		expect(result.success).toBeFalsy();
		if (!result.success) {
			const error = result.error;
			if (typeof error === "string") {
				expect(error).toBe("Could not find the Book.");
			}
		}
	});
});

describe("Testing out getABookUC", () => {
	const fakeBook = makeFakeBookWithAuthorAndPublisher();
	const getABookDBA = makeGetABookDBA({ db: prisma });
	const getABookDBAMocked = vi
		.fn(getABookDBA)
		.mockResolvedValueOnce({ success: true, data: fakeBook });
	const getABookUC = makeGetABookUC({ getABookDBA: getABookDBAMocked });
	afterAll(() => {
		vi.resetAllMocks();
	});

	it("SUCCESS: Get a book", async () => {
		const result = await getABookUC({ id: fakeBook.asin });
		if (result.success) {
			expect(result.data?.asin).toBe(fakeBook.asin);
		}
	});

	it("ERROR: id error", async () => {
		const result = await getABookUC({ id: "" });
		expect(result.success).toBeFalsy();
		if (!result.success) {
			const error = result.error as ZodError<getABookProps>;
			console.log(error);
			expect(error.format().id?._errors[0]).toBe("");
		}
	});
});
