import prisma from "../../prisma";
import { getAllBooksByPageDb, getAllBooksByPageUC } from "./getAllBooksByPage";
import { getBooksByTitleDb, getBooksByTitleUC } from "./getBooksByTitle";

const getAllBooksByPageDbDependency = getAllBooksByPageDb({
	db: prisma,
});

export const getAllBooksByPageUseCase = getAllBooksByPageUC({
	getAllBooksByPageDb: getAllBooksByPageDbDependency,
});

// get books by title
const getBooksByTitleDBAccess = getBooksByTitleDb({ db: prisma });

export const getBooksByTitleUseCase = getBooksByTitleUC({
	getBooksByTitleDB: getBooksByTitleDBAccess,
});
