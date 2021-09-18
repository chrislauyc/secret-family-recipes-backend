
exports.seed = function(knex) {
  return knex('steps').insert([
    {recipe_id: 1, step_number: 1, instructions:"cut the tomatoes"},
    {recipe_id: 1, step_number: 2, instructions:"cut the potatoes"},
    {recipe_id: 1, step_number: 3, instructions:"boil the broth with the ingredients"},
  ]);
};
