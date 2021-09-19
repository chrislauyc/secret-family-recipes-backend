
exports.up = function(knex) {
    return knex.schema
    .createTable("users",table=>{
        table.increments("user_id");
        table.string("username").notNullable().unique();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
    })
    .createTable("ingredients",table=>{
        table.increments("ingredient_id");
        table.string("ingredient_name").notNullable().unique();
    })
    .createTable("units",table=>{
        table.increments("unit_id");
        table.string("unit_name").notNullable().unique();
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
    })

    .createTable("steps",table=>{
        table.increments("step_id");

        table.integer("recipe_id")
        .notNullable()
        .references("recipe_id")
        .inTable("recipes")
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

        table.integer("step_number")
        .unsigned()
        .notNullable();

        table.string("instructions")
        .notNullable();
    })

    .createTable("ingredients_steps",table=>{
        table.increments("ingredients_steps_id");

        table.integer("ingredient_id")
        .notNullable()
        .references("ingredient_id")
        .inTable("ingredients")
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

        table.integer("step_id")
        .notNullable()
        .references("step_id")
        .inTable("steps")
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

        table.integer("unit_id")
        .defaultsTo(1)
        .references("unit_id")
        .inTable("units");

        table.double("amount")
        .notNullable()
        .unsigned();
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("ingredients_steps")
    .dropTableIfExists("steps")
    .dropTableIfExists("recipes")
    .dropTableIfExists("units")
    .dropTableIfExists("ingredients")
    .dropTableIfExists("users");
};
