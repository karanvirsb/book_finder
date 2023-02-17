import { type ThunkObjMap, type GraphQLFieldConfig } from "graphql";
import getAllBooksByPage from "./getAllBooksByPage.resolver";
import getBooksByTitleResolver from "./getBooksByTitle.resolver";

const bookResolvers: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {
	getAllBooksByPage,
	getBooksByTitleResolver,
};

export default bookResolvers;
