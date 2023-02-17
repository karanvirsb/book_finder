import prisma from "../../prisma";
import { getAllBooksByPageDb, getAllBooksByPageUC } from "./getAllBooksByPage";
import { getBooksByTitleDb } from "./getBooksByTitle";

const getAllBooksByPageDbDependency = getAllBooksByPageDb({
	db: prisma,
});

export const getAllBooksByPageUseCase = getAllBooksByPageUC({
	getAllBooksByPageDb: getAllBooksByPageDbDependency,
});

export const getBooksByTitleUseCase = getBooksByTitleDb({ db: prisma });
