import prisma from "../../prisma";
import { getAllBooksByPageDb } from "./getAllBooksByPage";
import { getBooksByTitleDb } from "./getBooksByTitle";

export const getAllBooksByPageUseCase = getAllBooksByPageDb({
	db: prisma,
});

export const getBooksByTitleUseCase = getBooksByTitleDb({ db: prisma });
