
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sources').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('sources').insert([
        {source_id: 1, source_name: 'grandma', user_id:1},
        {source_id: 2, source_name: 'grandpa', user_id:1},
      ]);
    });
};
