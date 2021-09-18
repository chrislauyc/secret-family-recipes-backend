const db = require("../../data/data-config");
const model = require("./recipesModel");

beforeEach(async()=>{
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
  });
  afterAll(async()=>{
    await db.destroy();
  });


describe("recipesModel.js",()=>{
    describe("get",()=>{
        test("returns the correct object",async()=>{
            const data = await model.get(1);
            expect(data).toHaveLength(2);
            const recipe = data[0];
            expect(recipe).toHaveProperty("recipe_id");
            expect(recipe).toHaveProperty("user_id");
            expect(recipe).toHaveProperty("source");
            expect(recipe).toHaveProperty("category");
            expect(recipe).toHaveProperty("recipe_name");
            expect(recipe).toHaveProperty("image_url");
            expect(recipe).toHaveProperty("steps");

            expect(recipe.steps).toHaveLength(3);

            const step = recipe.steps[0];

            expect(step).toHaveProperty("description");
            expect(step).toHaveProperty("ingredients");

            expect(step.ingredients).toHaveLength(1);

            const ingredient = step.ingredients[0];

            expect(ingredient).toHaveProperty("ingredient_name");
            expect(ingredient).toHaveProperty("amount");
            expect(ingredient).toHaveProperty("unit");
        })
    });
});