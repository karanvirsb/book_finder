import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends Record<string, unknown>> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	JSON: any;
}

export interface GetBooksByTitlePayload {
	__typename?: "GetBooksByTitlePayload";
	books?: Maybe<Array<Maybe<Book>>>;
	count?: Maybe<Scalars["Int"]>;
}

export interface RootQueryType {
	__typename?: "RootQueryType";
	getABook?: Maybe<Book>;
	getAllBooksByPage?: Maybe<Array<Maybe<Book>>>;
	getBooksByTitleResolver?: Maybe<GetBooksByTitlePayload>;
	getHelloWorld?: Maybe<Scalars["String"]>;
}

export interface RootQueryTypeGetABookArgs {
	id: InputMaybe<Scalars["String"]>;
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

export type GetABookQueryVariables = Exact<{
	getABookId: InputMaybe<Scalars["String"]>;
}>;

export interface GetABookQuery {
	__typename?: "RootQueryType";
	getABook?: {
		__typename?: "book";
		asin?: string | null;
		ISBN10?: string | null;
		currency?: string | null;
		description?: string | null;
		final_price?: number | null;
		format?: any | null;
		image_url?: string | null;
		item_weight?: string | null;
		product_dimensions?: string | null;
		rating?: string | null;
		reviews_count?: number | null;
		title?: string | null;
		url?: string | null;
		categories?: Array<string | null> | null;
		author?: { __typename?: "author"; name?: string | null } | null;
		publisher_id?: { __typename?: "publisher"; name?: string | null } | null;
	} | null;
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
	getBooksByTitleResolver?: {
		__typename?: "GetBooksByTitlePayload";
		count?: number | null;
		books?: Array<{
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
	} | null;
}

export const GetABookDocument = gql`
	query getABook($getABookId: String) {
		getABook(id: $getABookId) {
			asin
			ISBN10
			author {
				name
			}
			currency
			description
			final_price
			format
			image_url
			item_weight
			product_dimensions
			rating
			reviews_count
			publisher_id {
				name
			}
			title
			url
			categories
		}
	}
`;

export function useGetABookQuery(
	options?: Omit<Urql.UseQueryArgs<GetABookQueryVariables>, "query">
) {
	return Urql.useQuery<GetABookQuery, GetABookQueryVariables>({
		query: GetABookDocument,
		...options,
	});
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

export function useGetAllBooksQuery(
	options?: Omit<Urql.UseQueryArgs<GetAllBooksQueryVariables>, "query">
) {
	return Urql.useQuery<GetAllBooksQuery, GetAllBooksQueryVariables>({
		query: GetAllBooksDocument,
		...options,
	});
}
export const GetBooksByTitleDocument = gql`
	query getBooksByTitle($limit: Int, $page: Int, $searchQuery: String) {
		getBooksByTitleResolver(
			limit: $limit
			page: $page
			searchQuery: $searchQuery
		) {
			books {
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
			count
		}
	}
`;

export function useGetBooksByTitleQuery(
	options?: Omit<Urql.UseQueryArgs<GetBooksByTitleQueryVariables>, "query">
) {
	return Urql.useQuery<GetBooksByTitleQuery, GetBooksByTitleQueryVariables>({
		query: GetBooksByTitleDocument,
		...options,
	});
}
