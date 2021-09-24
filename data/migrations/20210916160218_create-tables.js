
exports.up = function(knex) {
    return knex.schema
    .createTable("users",table=>{
        table.increments("user_id");
        table.string("username").notNullable().unique();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
    })
    .createTable("recipes",table=>{
        table.increments("recipe_id");

        table.integer("user_id")
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

        table.string("category_name");

        table.string("source_name");

        table.string("recipe_name").notNullable();

        table.string("image_url");

        table.text("descriptions").notNullable();

        table.text("ingredients").notNullable();
    })
    
    
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("recipes")
    .dropTableIfExists("users");
};
