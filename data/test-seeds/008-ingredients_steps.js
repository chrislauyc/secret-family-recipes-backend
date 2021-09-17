
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ingredients_steps').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('ingredients_steps').insert([
        {ingredients_steps_id: 1, ingredient_id: 1, step_id:1, amount:4},
        {ingredients_steps_id: 2, ingredient_id: 2, step_id:2, amount:1},
        {ingredients_steps_id: 3, ingredient_id: 3, step_id:3, amount:2, unit_id: 3},
      ]);
    });
};
