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
        });
        test("returns empty array if user_id does not exist",async()=>{
            expect(await model.get(100)).toHaveLength(0);
        })
    });
    describe("getById",()=>{
        test("returns the correct shape",async()=>{
            const recipe = await model.getById(1);
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
        });
    });
    describe("insert",()=>{
        const recipe = {
            user_id:1,
            source:"grandmother",
            category:"dinner",
            recipe_name:"tacos",
            image_url:"https://someimage.jpg",
            steps:[
                {
                    description:"cook them",
                    ingredients:[
                        {
                            ingredient_name:"taco shell",
                            amount:10,
                            unit:"none"
                        },
                        {
                            ingredient_name:"miced beef",
                            amount:125,
                            unit:"gram"
                        }
                    ]
                }
            ]
        }
        test("can insert into database",async()=>{

            const [recipe_id] = await model.insert(recipe);
            expect(await db("recipes").where({recipe_id,recipe_name:"tacos"})).toHaveLength(1);
            expect(
                await db("recipes")
                .where({recipe_id,recipe_name:"tacos",source_name:"grandmother",category_name:"dinner",image_url:"https://someimage.jpg"})
            ).toHaveLength(1);

            expect(
                await db("steps")
                .where({recipe_id})
                .join("ingredients_steps as i","i.step_id","steps.step_id")
                .join("ingredients","i.ingredient_id","ingredients.ingredient_id")
                .leftJoin("units","units.unit_id","i.unit_id")
            ).toHaveLength(2);
        })
        test("add duplicate recipe with different recipe_name without error",async()=>{
            await model.insert(recipe);
            await model.insert({...recipe,recipe_name:"another name"});
        })
    });
    describe("update",()=>{
        test("updated record in db",async()=>{
            const recipe = {
                user_id:1,
                source:"grandmother",
                category:"dinner",
                recipe_name:"tacos",
                image_url:"https://someimage.jpg",
                steps:[
                    {
                        description:"cook them",
                        ingredients:[
                            {
                                ingredient_name:"taco shell",
                                amount:10,
                                unit:"none"
                            },
                            {
                                ingredient_name:"miced beef",
                                amount:125,
                                unit:"gram"
                            }
                        ]
                    }
                ]
            }

            //ing_steps that are not recipe_id:1
            const ing_steps = await db("steps")
            .whereNot({recipe_id:1})
            .join("ingredients_steps as i","i.step_id","steps.step_id");

            const [recipe_id] = await model.update(recipe,1);
            expect(await db("recipes").where({recipe_id,recipe_name:"tacos"})).toHaveLength(1);
            expect(
                await db("recipes")
                .where({recipe_id,recipe_name:"tacos",source_name:"grandmother",category_name:"dinner",image_url:"https://someimage.jpg"})
            ).toHaveLength(1);
            expect(
                await db("steps")
                .where({recipe_id})
                .join("ingredients_steps as i","i.step_id","steps.step_id")
                .join("ingredients","i.ingredient_id","ingredients.ingredient_id")
                .leftJoin("units","units.unit_id","i.unit_id")
            ).toHaveLength(2);

            expect(
                await db("ingredients_steps")
            ).toHaveLength(ing_steps.length+2);
        });
    });
    describe("remove",()=>{
        test("removed records from db",async()=>{
            //ing_steps that are not recipe_id:1
            const ing_steps = await db("steps")
            .whereNot({recipe_id:1})
            .join("ingredients_steps as i","i.step_id","steps.step_id");
            //call function
            const [recipe_id] = await model.remove(1);
            expect(
                await db("recipes").where({recipe_id})
            ).toHaveLength(0);
            expect(
                await db("ingredients_steps")
            ).toHaveLength(ing_steps.length);
            

        });
    });
});
