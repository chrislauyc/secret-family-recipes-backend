
exports.seed = function(knex) {
  // Inserts seed entries
  return knex('ingredients').insert([
    {ingredient_name: 'tomatoe'},
    {ingredient_name: 'potatoe'},
    {ingredient_name: 'chicken broth'}
  ]);
};
