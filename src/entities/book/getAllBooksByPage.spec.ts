import { describe, expect, it } from "vitest";
import {
	type IGetAllBooksByPageDb,
	getAllBooksByPageDb,
} from "./getAllBooksByPage";
import prisma from "../../prisma";
import { type Books, type Author } from "@prisma/client";

const getAllBooksByPageDbAccess: IGetAllBooksByPageDb["getAllBooksByPageDb"] =
	getAllBooksByPageDb({
		db: prisma,
	});

describe("Tesing getAllBooksByPage UC and DB Access", () => {
	it("Testing out DBAcess", async () => {
		const result = (await getAllBooksByPageDbAccess({
			limit: 1,
			page: 0,
		})) as Array<
			Books & {
				author: Author;
			}
		>;
		console.log(result);
		expect(result.length).toBe(1);
	});
});
