-- CreateTable
CREATE TABLE "Proxy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ip" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "discountPercentage" REAL NOT NULL,
    "rating" REAL NOT NULL,
    "stock" INTEGER NOT NULL,
    "brand" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL
);
