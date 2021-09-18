
exports.seed = function(knex) {
  return knex('categories').insert([
    {category_name: 'breakfast'},
    {category_name: 'lunch'},
    {category_name: 'dinner'},
  ]);
};
