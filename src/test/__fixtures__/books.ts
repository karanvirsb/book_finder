import { type Publisher, type Author, type Books } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { type Decimal } from "@prisma/client/runtime";

export default function makeFakeBook(): Books & { author: Author } {
	const authorId = faker.datatype.number();
	const authorName = `${faker.name.firstName("male")} ${faker.name.lastName(
		"male"
	)}`;
	return {
		asin: faker.datatype.uuid(),
		ISBN10: faker.datatype.uuid(),
		author_id: authorId,
		currency: faker.helpers.arrayElement(["USD", "EUR"]),
		description: faker.datatype.string(20),
		final_price: parseFloat(faker.finance.amount(1, 4)) as unknown as Decimal,
		format: faker.datatype.json(),
		// '[{"name":"Kindle","price":"$7.99","url":"/Sir-Phillip-Love-Epilogue-Bridgertons-ebook/dp/B00U6SFUVK"},{"name":"Audiobook","price":"Audiobook $0.00","url":"/To-Sir-Phillip-with-Love-audiobook/dp/B073V6LP7C"},{"name":"Hardcover","price":"$17.89","url":"/Sir-Phillip-Love-Bridgerton-Bridgertons/dp/0063141345"},{"name":"Paperback","price":"$7.10","url":"/Sir-Phillip-Love-Bridgerton-Bridgertons/dp/0063141256"},{"name":"Audio CD","price":"$91.99","url":"/Bridgerton-Sir-Phillip-Love/dp/1004053118"}]',
		image_url: faker.internet.url(),
		images_count: faker.datatype.number(),
		item_weight: faker.datatype.string(),
		product_dimensions: faker.datatype.string(),
		rating: faker.datatype.string(),
		reviews_count: 15975,
		publisher_id: 1,
		title: faker.datatype.string(),
		url: faker.internet.url(),
		categories: ["Books", "Literature & Fiction", "Women's Fiction"],
		author: {
			id: authorId,
			name: authorName,
			email: faker.internet.email(authorName),
		},
	};
}

export function makeFakeBookWithAuthorAndPublisher(): Books & {
	author: Author;
	publisher: Publisher;
} {
	const authorId = faker.datatype.number();
	const authorName = `${faker.name.firstName("male")} ${faker.name.lastName(
		"male"
	)}`;
	const publisherId = faker.datatype.number();
	const publisherName = faker.company.bsNoun();
	return {
		asin: faker.datatype.uuid(),
		ISBN10: faker.datatype.uuid(),
		author_id: authorId,
		currency: faker.helpers.arrayElement(["USD", "EUR"]),
		description: faker.datatype.string(20),
		final_price: parseFloat(faker.finance.amount(1, 4)) as unknown as Decimal,
		format: faker.datatype.json(),
		// '[{"name":"Kindle","price":"$7.99","url":"/Sir-Phillip-Love-Epilogue-Bridgertons-ebook/dp/B00U6SFUVK"},{"name":"Audiobook","price":"Audiobook $0.00","url":"/To-Sir-Phillip-with-Love-audiobook/dp/B073V6LP7C"},{"name":"Hardcover","price":"$17.89","url":"/Sir-Phillip-Love-Bridgerton-Bridgertons/dp/0063141345"},{"name":"Paperback","price":"$7.10","url":"/Sir-Phillip-Love-Bridgerton-Bridgertons/dp/0063141256"},{"name":"Audio CD","price":"$91.99","url":"/Bridgerton-Sir-Phillip-Love/dp/1004053118"}]',
		image_url: faker.internet.url(),
		images_count: faker.datatype.number(),
		item_weight: faker.datatype.string(),
		product_dimensions: faker.datatype.string(),
		rating: faker.datatype.string(),
		reviews_count: 15975,
		publisher_id: 1,
		title: faker.datatype.string(),
		url: faker.internet.url(),
		categories: ["Books", "Literature & Fiction", "Women's Fiction"],
		author: {
			id: authorId,
			name: authorName,
			email: faker.internet.email(authorName),
		},
		publisher: {
			id: publisherId,
			name: publisherName,
			email: faker.internet.email(publisherName),
			phone: faker.phone.number(),
		},
	};
}
