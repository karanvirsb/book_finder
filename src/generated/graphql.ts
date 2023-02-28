import { type GraphQLClient } from "graphql-request";
import type * as Dom from "graphql-request/dist/types.dom";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends Record<string, unknown>> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	JSON: any;
}

export interface RootQueryType {
	__typename?: "RootQueryType";
	getAllBooksByPage?: Maybe<Array<Maybe<Book>>>;
	getBooksByTitleResolver?: Maybe<Array<Maybe<Book>>>;
	getHelloWorld?: Maybe<Scalars["String"]>;
}

export interface RootQueryTypeGetAllBooksByPageArgs {
	limit: InputMaybe<Scalars["Int"]>;
	page: InputMaybe<Scalars["Int"]>;
}

export interface RootQueryTypeGetBooksByTitleResolverArgs {
	limit: InputMaybe<Scalars["Int"]>;
	page: InputMaybe<Scalars["Int"]>;
	searchQuery: InputMaybe<Scalars["String"]>;
}

export interface Author {
	__typename?: "author";
	email?: Maybe<Scalars["String"]>;
	id?: Maybe<Scalars["Int"]>;
	name?: Maybe<Scalars["String"]>;
}

export interface Book {
	__typename?: "book";
	ISBN10?: Maybe<Scalars["String"]>;
	asin?: Maybe<Scalars["String"]>;
	author?: Maybe<Author>;
	categories?: Maybe<Array<Maybe<Scalars["String"]>>>;
	currency?: Maybe<Scalars["String"]>;
	description?: Maybe<Scalars["String"]>;
	final_price?: Maybe<Scalars["Float"]>;
	format?: Maybe<Scalars["JSON"]>;
	image_url?: Maybe<Scalars["String"]>;
	images_count?: Maybe<Scalars["Int"]>;
	item_weight?: Maybe<Scalars["String"]>;
	product_dimensions?: Maybe<Scalars["String"]>;
	publisher_id?: Maybe<Publisher>;
	rating?: Maybe<Scalars["String"]>;
	reviews_count?: Maybe<Scalars["Int"]>;
	title?: Maybe<Scalars["String"]>;
	url?: Maybe<Scalars["String"]>;
}

export interface Publisher {
	__typename?: "publisher";
	email?: Maybe<Scalars["String"]>;
	id?: Maybe<Scalars["Int"]>;
	name?: Maybe<Scalars["String"]>;
	phone?: Maybe<Scalars["String"]>;
}

export type GetAllBooksQueryVariables = Exact<{
	limit: InputMaybe<Scalars["Int"]>;
	page: InputMaybe<Scalars["Int"]>;
}>;

export interface GetAllBooksQuery {
	__typename?: "RootQueryType";
	getAllBooksByPage?: Array<{
		__typename?: "book";
		asin?: string | null;
		description?: string | null;
		image_url?: string | null;
		rating?: string | null;
		title?: string | null;
		author?: {
			__typename?: "author";
			name?: string | null;
			id?: number | null;
		} | null;
	} | null> | null;
}

export type GetBooksByTitleQueryVariables = Exact<{
	limit: InputMaybe<Scalars["Int"]>;
	page: InputMaybe<Scalars["Int"]>;
	searchQuery: InputMaybe<Scalars["String"]>;
}>;

export interface GetBooksByTitleQuery {
	__typename?: "RootQueryType";
	getBooksByTitleResolver?: Array<{
		__typename?: "book";
		asin?: string | null;
		description?: string | null;
		image_url?: string | null;
		rating?: string | null;
		title?: string | null;
		author?: {
			__typename?: "author";
			name?: string | null;
			id?: number | null;
		} | null;
	} | null> | null;
}

export const GetAllBooksDocument = gql`
	query getAllBooks($limit: Int, $page: Int) {
		getAllBooksByPage(limit: $limit, page: $page) {
			asin
			author {
				name
				id
			}
			description
			image_url
			rating
			title
		}
	}
`;
export const GetBooksByTitleDocument = gql`
	query getBooksByTitle($limit: Int, $page: Int, $searchQuery: String) {
		getBooksByTitleResolver(
			limit: $limit
			page: $page
			searchQuery: $searchQuery
		) {
			asin
			author {
				name
				id
			}
			description
			image_url
			rating
			title
		}
	}
`;

export type SdkFunctionWrapper = <T>(
	action: (requestHeaders?: Record<string, string>) => Promise<T>,
	operationName: string,
	operationType?: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = async (
	action,
	_operationName,
	_operationType
) => await action();

export function getSdk(
	client: GraphQLClient,
	withWrapper: SdkFunctionWrapper = defaultWrapper
) {
	return {
		async getAllBooks(
			variables?: GetAllBooksQueryVariables,
			requestHeaders?: Dom.RequestInit["headers"]
		): Promise<GetAllBooksQuery> {
			return await withWrapper(
				async (wrappedRequestHeaders) =>
					await client.request<GetAllBooksQuery>(
						GetAllBooksDocument,
						variables,
						{ ...requestHeaders, ...wrappedRequestHeaders }
					),
				"getAllBooks",
				"query"
			);
		},
		async getBooksByTitle(
			variables?: GetBooksByTitleQueryVariables,
			requestHeaders?: Dom.RequestInit["headers"]
		): Promise<GetBooksByTitleQuery> {
			return await withWrapper(
				async (wrappedRequestHeaders) =>
					await client.request<GetBooksByTitleQuery>(
						GetBooksByTitleDocument,
						variables,
						{ ...requestHeaders, ...wrappedRequestHeaders }
					),
				"getBooksByTitle",
				"query"
			);
		},
	};
}
export type Sdk = ReturnType<typeof getSdk>;
