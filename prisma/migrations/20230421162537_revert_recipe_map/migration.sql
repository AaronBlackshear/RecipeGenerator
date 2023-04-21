/*
  Warnings:

  - You are about to drop the `Recipe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "recipe_directions" DROP CONSTRAINT "recipe_directions_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "recipe_optional_ingredient" DROP CONSTRAINT "recipe_optional_ingredient_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "recipe_required_ingredient" DROP CONSTRAINT "recipe_required_ingredient_recipe_id_fkey";

-- DropTable
DROP TABLE "Recipe";

-- CreateTable
CREATE TABLE "recipes" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "cook_time" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "prep_time" INTEGER NOT NULL,
    "servings" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recipes_user_id_title_key" ON "recipes"("user_id", "title");

-- AddForeignKey
ALTER TABLE "recipe_directions" ADD CONSTRAINT "recipe_directions_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_required_ingredient" ADD CONSTRAINT "recipe_required_ingredient_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_optional_ingredient" ADD CONSTRAINT "recipe_optional_ingredient_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
