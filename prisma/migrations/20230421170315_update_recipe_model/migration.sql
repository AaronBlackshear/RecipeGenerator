/*
  Warnings:

  - The primary key for the `recipe_directions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `recipe_optional_ingredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `recipe_required_ingredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `recipes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `updatedAt` to the `recipe_directions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `recipe_optional_ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `recipe_required_ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "recipe_directions" DROP CONSTRAINT "recipe_directions_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "recipe_optional_ingredient" DROP CONSTRAINT "recipe_optional_ingredient_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "recipe_required_ingredient" DROP CONSTRAINT "recipe_required_ingredient_recipe_id_fkey";

-- AlterTable
ALTER TABLE "recipe_directions" DROP CONSTRAINT "recipe_directions_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "recipe_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "recipe_directions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "recipe_directions_id_seq";

-- AlterTable
ALTER TABLE "recipe_optional_ingredient" DROP CONSTRAINT "recipe_optional_ingredient_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "recipe_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "recipe_optional_ingredient_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "recipe_optional_ingredient_id_seq";

-- AlterTable
ALTER TABLE "recipe_required_ingredient" DROP CONSTRAINT "recipe_required_ingredient_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "recipe_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "recipe_required_ingredient_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "recipe_required_ingredient_id_seq";

-- AlterTable
ALTER TABLE "recipes" DROP CONSTRAINT "recipes_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "recipes_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "recipes_id_seq";

-- AddForeignKey
ALTER TABLE "recipe_directions" ADD CONSTRAINT "recipe_directions_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_required_ingredient" ADD CONSTRAINT "recipe_required_ingredient_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_optional_ingredient" ADD CONSTRAINT "recipe_optional_ingredient_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
