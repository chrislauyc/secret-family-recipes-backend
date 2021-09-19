const db = require("../../data/data-config");

const get = async(user_id) =>{
    const recipes = await db("recipes")
    .where("recipes.user_id",user_id)
    .join("sources","sources.source_id","recipes.source_id")
    .join("categories","categories.category_id","recipes.category_id")
    .select(
        "recipe_id",
        "recipes.user_id",
        "category_name as category",
        "recipe_name",
        "image_url",
        "source_name as source"
    );
    for(let recipe of recipes){
        recipe.steps = await db("steps")
        .where({recipe_id:recipe.recipe_id})
        .orderBy("step_number","asc")
        .select("instructions as description","step_id");

        for(let step of recipe.steps){
            step.ingredients = await db("ingredients_steps as i")
            .join("ingredients","i.ingredient_id","ingredients.ingredient_id")
            .leftJoin("units","units.unit_id","i.unit_id")
            .where({step_id:step.step_id})
            .select("ingredient_name","amount","unit_name as unit")
        }
    }
    return recipes;

};

const getById = async(recipe_id) =>{
    const recipe = await db("recipes")
    .where("recipes.recipe_id",recipe_id)
    .join("sources","sources.source_id","recipes.source_id")
    .join("categories","categories.category_id","recipes.category_id")
    .select(
        "recipe_id",
        "recipes.user_id",
        "category_name as category",
        "recipe_name",
        "image_url",
        "source_name as source"
    ).first();
    recipe.steps = await db("steps")
        .where({recipe_id})
        .orderBy("step_number","asc")
        .select("instructions as description","step_id");

        for(let step of recipe.steps){
            step.ingredients = await db("ingredients_steps as i")
            .join("ingredients","i.ingredient_id","ingredients.ingredient_id")
            .leftJoin("units","units.unit_id","i.unit_id")
            .where({step_id:step.step_id})
            .select("ingredient_name","amount","unit_name as unit")
        }
    return recipe;
};

const insert = async(data) =>{
    //check already existing
    const categories = await db("categories")
    .where({category_name:data.category_name});
    //insert if exists
    const category_id = categories.length === 0
    ?
    (await db("categories")
        .insert({category_name:data.category_name})
        .returning("category_id"))[0]
    :
    categories[0].category_id
    //check already existing
    const sources = await db("sources")
    .where({source_name:data.source_name,user_id:data.user_id});
    //insert if exists
    const source_id = sources.length === 0
    ?
    (await db("sources")
        .insert({source_name:data.source_name,user_id:data.user_id})
        .returning("source_id"))[0]
    :
    sources[0].source_id
    //recipe insert
    const [recipe_id] = await db("recipes")
    .insert({
        recipe_name:data.recipe_name,
        source_id,
        user_id:data.user_id,
        image_url:data.image_url,
        category_id,
    })
    .returning("recipe_id");
    //inserting steps
    for(let j = 0; j < data.steps.length;j++){
        const step = data.steps[j];
        const ingredients = step.ingredients.map(({ingredient_name})=>({ingredient_name}));

        const unit_ids = [];

        for(let {unit_name} of step.ingredients){
            const unit = await db("units")
            .where({unit_name});

            if(unit.length===0){
                const [unit_id] = await db("units")
                .insert({unit_name})
                .returning("unit_id");
                unit_ids.push(unit_id);
            }
        }   

        const [step_id] = await db("steps")
        .insert({
            step_number:j+1,
            instructions:step.instructions,
            recipe_id
        })
        .returning("step_id");

        const ingredient_ids = await db("ingredients")
        .insert(ingredients)
        .returning("ingredient_id");

        const ingredients_steps = step.ingredients.map(({amount},i)=>({
            amount,
            step_id,
            unit_id:unit_ids[i],
            ingredient_id:ingredient_ids[i]
        }));

        await db("ingredients_steps")
        .insert(ingredients_steps)
    } 
    return recipe_id;
};

const update = (data,recipe_id) =>{

};

const remove = (recipe_id) =>{

};

module.exports = {
    get,
    getById,
    insert,
    update,
    remove
}

