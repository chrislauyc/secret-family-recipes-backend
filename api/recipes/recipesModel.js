const db = require("../../data/data-config");

const insertSteps = async(steps,recipe_id)=>{
    //inserting steps
    for(let j = 0; j < steps.length;j++){
        const step = steps[j];
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
            else{
                unit_ids.push(unit[0].unit_id);
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
};

const get = async(user_id) =>{
    const recipes = await db("recipes")
    .where("recipes.user_id",user_id)
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
    //recipe insert
    const [recipe_id] = await db("recipes")
    .insert({
        recipe_name:data.recipe_name,
        source_name:data.source_name,
        user_id:data.user_id,
        image_url:data.image_url,
        category_name:data.category_name,
    })
    .returning("recipe_id");
    await insertSteps(data.steps,recipe_id);
    return [recipe_id];
};

const update = async(data,recipe_id) =>{

    //recipe insert
    await db("recipes")
    .where({recipe_id})
    .update({
        recipe_name:data.recipe_name,
        source_name:data.source_name,
        user_id:data.user_id,
        image_url:data.image_url,
        category_name:data.category_name,
    })
    .returning("recipe_id");    

    await db("steps")
    .where({recipe_id})
    .delete();

    await insertSteps(data.steps,recipe_id);
    return [recipe_id];
};

const remove = (recipe_id) =>{
    return db("recipes").where({recipe_id}).delete().returning("recipe_id");
};

module.exports = {
    get,
    getById,
    insert,
    update,
    remove
}