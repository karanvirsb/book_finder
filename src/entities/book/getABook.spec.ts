import { afterAll, describe, expect, it, vi } from "vitest";
import makeGetABookDBA from "./getABook";
import prisma from "../../prisma";

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
