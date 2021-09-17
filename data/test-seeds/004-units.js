
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('units').del()
    .then(function () {
      // Inserts seed entries
      return knex('units').insert([
        {unit_id: 1, unit_name: 'gram'},
        {unit_id: 2, unit_name: 'pound'},
        {unit_id: 3, unit_name: "cup"}
      ]);
    });
};
