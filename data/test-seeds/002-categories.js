
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {category_id: 1, category_name: 'breakfast'},
        {category_id: 2, category_name: 'lunch'},
        {category_id: 3, category_name: 'dinner'},
      ]);
    });
};
