
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {recipe_id: 1, user_id: 1, category_id:1, source_id:1, recipe_name:"good stuff", image_url:"https://www.thewholesomedish.com/wp-content/uploads/2019/06/The-Best-Classic-Tacos-550.jpg"},
        {recipe_id: 2, user_id: 1, category_id:1, source_id:2, recipe_name:"really good stuff", image_url:"https://www.thewholesomedish.com/wp-content/uploads/2019/06/The-Best-Classic-Tacos-550.jpg"},
      ]);
    });
};
