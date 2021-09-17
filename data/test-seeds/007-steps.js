
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('steps').del()
    .then(function () {
      // Inserts seed entries
      return knex('steps').insert([
        {step_id: 1, recipe_id: 1, step_number: 1, instructions:"cut the tomatoes"},
        {step_id: 2, recipe_id: 1, step_number: 2, instructions:"cut the potatoes"},
        {step_id: 3, recipe_id: 1, step_number: 3, instructions:"boil the broth with the ingredients"},
      ]);
    });
};
