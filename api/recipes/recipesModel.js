const db = require("../../data/data-config");

const get = (user_id) =>{
    return db("recipes")
    .where("recipes.user_id",user_id)
    .select(
        "recipe_id",
        "recipes.user_id",
        "category_name as category",
        "recipe_name",
        "image_url",
        "source_name as source",
        "ingredients",
        "descriptions"
    );
};
const getById = (recipe_id) =>{
    return db("recipes")
    .where("recipe_id",recipe_id)
    .select(
        "recipe_id",
        "recipes.user_id",
        "category_name as category",
        "recipe_name",
        "image_url",
        "source_name as source",
        "ingredients",
        "descriptions"
    ).first();
};

const insert = (data) =>{
    //recipe insert
    return db("recipes")
    .insert({
        recipe_name:data.recipe_name,
        source_name:data.source,
        user_id:data.user_id,
        image_url:data.image_url,
        category_name:data.category,
        ingredients:data.ingredients,
        descriptions:data.descriptions
    })
    .returning("recipe_id");
};

const update = (data,recipe_id) =>{
    //recipe insert
    return db("recipes")
    .where({recipe_id})
    .update({
        recipe_name:data.recipe_name,
        source_name:data.source,
        user_id:data.user_id,
        image_url:data.image_url,
        category_name:data.category,
        ingredients:data.ingredients
    })
    .returning("recipe_id");    
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