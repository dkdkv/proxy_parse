/*
  Warnings:

  - Added the required column `productId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" TEXT NOT NULL,
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
INSERT INTO "new_Product" ("brand", "category", "description", "discountPercentage", "id", "price", "rating", "stock", "thumbnail", "title") SELECT "brand", "category", "description", "discountPercentage", "id", "price", "rating", "stock", "thumbnail", "title" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_productId_key" ON "Product"("productId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
