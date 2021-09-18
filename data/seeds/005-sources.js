
exports.seed = function(knex) {
  return knex('sources').insert([
    {source_name: 'grandma', user_id:1},
    {source_name: 'grandpa', user_id:1},
  ]);
};
