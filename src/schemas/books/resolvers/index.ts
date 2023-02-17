import { type ThunkObjMap, type GraphQLFieldConfig } from "graphql";
import getAllBooksByPage from "./getAllBooksByPage.resolver";

const bookResolvers: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {
	getAllBooksByPage,
};

export default bookResolvers;
