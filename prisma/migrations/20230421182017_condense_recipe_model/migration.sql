/*
  Warnings:

  - You are about to drop the column `cook_time` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `prep_time` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the `RecipeDirection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeOptionalIngredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeRequiredIngredient` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,title]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cookTime` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prepTime` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RecipeDirection" DROP CONSTRAINT "RecipeDirection_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "RecipeOptionalIngredient" DROP CONSTRAINT "RecipeOptionalIngredient_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "RecipeRequiredIngredient" DROP CONSTRAINT "RecipeRequiredIngredient_recipe_id_fkey";

-- DropIndex
DROP INDEX "Recipe_user_id_title_key";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "cook_time",
DROP COLUMN "prep_time",
DROP COLUMN "user_id",
ADD COLUMN     "cookTime" INTEGER NOT NULL,
ADD COLUMN     "directions" TEXT[],
ADD COLUMN     "optionalIngredients" TEXT[],
ADD COLUMN     "prepTime" INTEGER NOT NULL,
ADD COLUMN     "requiredIngredients" TEXT[],
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "RecipeDirection";

-- DropTable
DROP TABLE "RecipeOptionalIngredient";

-- DropTable
DROP TABLE "RecipeRequiredIngredient";

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_userId_title_key" ON "Recipe"("userId", "title");
