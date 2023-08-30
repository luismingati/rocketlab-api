-- CreateTable
CREATE TABLE "Product" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "quantity" INTEGER,
    "description" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
