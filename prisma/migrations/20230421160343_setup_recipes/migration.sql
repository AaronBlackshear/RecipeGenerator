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

-- CreateTable
CREATE TABLE "recipe_directions" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "recipe_id" INTEGER NOT NULL,

    CONSTRAINT "recipe_directions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_required_ingredient" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "recipe_id" INTEGER NOT NULL,

    CONSTRAINT "recipe_required_ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_optional_ingredient" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "recipe_id" INTEGER NOT NULL,

    CONSTRAINT "recipe_optional_ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recipes_user_id_title_key" ON "recipes"("user_id", "title");

-- CreateIndex
CREATE UNIQUE INDEX "recipe_directions_recipe_id_value_key" ON "recipe_directions"("recipe_id", "value");

-- CreateIndex
CREATE UNIQUE INDEX "recipe_required_ingredient_recipe_id_value_key" ON "recipe_required_ingredient"("recipe_id", "value");

-- CreateIndex
CREATE UNIQUE INDEX "recipe_optional_ingredient_recipe_id_value_key" ON "recipe_optional_ingredient"("recipe_id", "value");

-- AddForeignKey
ALTER TABLE "recipe_directions" ADD CONSTRAINT "recipe_directions_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_required_ingredient" ADD CONSTRAINT "recipe_required_ingredient_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_optional_ingredient" ADD CONSTRAINT "recipe_optional_ingredient_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
