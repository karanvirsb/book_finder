import prisma from "../../prisma";
import { getAllBooksByPageDb, getAllBooksByPageUC } from "./getAllBooksByPage";
import { getBooksByTitleDb, getBooksByTitleUC } from "./getBooksByTitle";

export const getAllBooksByPageDbAccess = getAllBooksByPageDb({
	db: prisma,
});

export const getAllBooksByPageUseCase = getAllBooksByPageUC({
	getAllBooksByPageDb: getAllBooksByPageDbAccess,
});

// get books by title
export const getBooksByTitleDBAccess = getBooksByTitleDb({ db: prisma });

export const getBooksByTitleUseCase = getBooksByTitleUC({
	getBooksByTitleDB: getBooksByTitleDBAccess,
});
