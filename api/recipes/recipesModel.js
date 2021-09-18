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

const getById = (recipe_id) =>{

};

const insert = (data) =>{

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

