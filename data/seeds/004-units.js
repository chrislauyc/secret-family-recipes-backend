
exports.seed = function(knex) {
  return knex('units').insert([
    {unit_name: "none"},
    {unit_name: 'gram'},
    {unit_name: 'pound'},
    {unit_name: "cup"}
  ]);
};
