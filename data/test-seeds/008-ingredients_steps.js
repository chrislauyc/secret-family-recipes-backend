
exports.seed = function(knex) {
  return knex('ingredients_steps').insert([
    {ingredient_id: 1, step_id:1, amount:4},
    {ingredient_id: 2, step_id:2, amount:1},
    {ingredient_id: 3, step_id:3, amount:2, unit_id: 3},
  ]);
};
