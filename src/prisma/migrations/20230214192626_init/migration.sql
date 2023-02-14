-- CreateTable
CREATE TABLE "Books" (
    "asin" TEXT NOT NULL,
    "ISBN10" TEXT NOT NULL,
    "author_id" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "final_price" DECIMAL(65,30) NOT NULL,
    "format" JSONB NOT NULL,
    "image_url" TEXT NOT NULL,
    "images_count" INTEGER NOT NULL,
    "item_weight" TEXT NOT NULL,
    "product_dimensions" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "reviews_count" INTEGER NOT NULL,
    "publisher_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "categories" TEXT[],

    CONSTRAINT "Books_pkey" PRIMARY KEY ("asin")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publisher" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Publisher_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_publisher_id_fkey" FOREIGN KEY ("publisher_id") REFERENCES "Publisher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
