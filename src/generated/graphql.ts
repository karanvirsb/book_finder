import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  getAllBooksByPage?: Maybe<Array<Maybe<Book>>>;
  getBooksByTitleResolver?: Maybe<Array<Maybe<Book>>>;
  getHelloWorld?: Maybe<Scalars['String']>;
};


export type RootQueryTypeGetAllBooksByPageArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type RootQueryTypeGetBooksByTitleResolverArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type Author = {
  __typename?: 'author';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type Book = {
  __typename?: 'book';
  ISBN10?: Maybe<Scalars['String']>;
  asin?: Maybe<Scalars['String']>;
  author?: Maybe<Author>;
  categories?: Maybe<Array<Maybe<Scalars['String']>>>;
  currency?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  final_price?: Maybe<Scalars['Float']>;
  format?: Maybe<Scalars['JSON']>;
  image_url?: Maybe<Scalars['String']>;
  images_count?: Maybe<Scalars['Int']>;
  item_weight?: Maybe<Scalars['String']>;
  product_dimensions?: Maybe<Scalars['String']>;
  publisher_id?: Maybe<Publisher>;
  rating?: Maybe<Scalars['String']>;
  reviews_count?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type Publisher = {
  __typename?: 'publisher';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};
