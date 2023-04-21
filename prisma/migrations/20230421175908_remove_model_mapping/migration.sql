/*
  Warnings:

  - You are about to drop the `recipe_directions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recipe_optional_ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recipe_required_ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recipes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "recipe_directions" DROP CONSTRAINT "recipe_directions_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "recipe_optional_ingredient" DROP CONSTRAINT "recipe_optional_ingredient_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "recipe_required_ingredient" DROP CONSTRAINT "recipe_required_ingredient_recipe_id_fkey";

-- DropTable
DROP TABLE "recipe_directions";

-- DropTable
DROP TABLE "recipe_optional_ingredient";

-- DropTable
DROP TABLE "recipe_required_ingredient";

-- DropTable
DROP TABLE "recipes";

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "cook_time" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "prep_time" INTEGER NOT NULL,
    "servings" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeDirection" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "value" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,

    CONSTRAINT "RecipeDirection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeRequiredIngredient" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "value" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,

    CONSTRAINT "RecipeRequiredIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeOptionalIngredient" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "value" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,

    CONSTRAINT "RecipeOptionalIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_user_id_title_key" ON "Recipe"("user_id", "title");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeDirection_recipe_id_value_key" ON "RecipeDirection"("recipe_id", "value");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeRequiredIngredient_recipe_id_value_key" ON "RecipeRequiredIngredient"("recipe_id", "value");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeOptionalIngredient_recipe_id_value_key" ON "RecipeOptionalIngredient"("recipe_id", "value");

-- AddForeignKey
ALTER TABLE "RecipeDirection" ADD CONSTRAINT "RecipeDirection_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeRequiredIngredient" ADD CONSTRAINT "RecipeRequiredIngredient_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeOptionalIngredient" ADD CONSTRAINT "RecipeOptionalIngredient_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
