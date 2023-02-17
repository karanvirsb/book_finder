import prisma from "../../prisma";
import { getAllBooksByPageDb } from "./getAllBooksByPage";

export const getAllBooksByPageUseCase = getAllBooksByPageDb({
	db: prisma,
});

export const BookUseCases = Object.freeze({
	getAllBooksByPageUseCase,
});
