const invalid1 = {
    user_id:1,
    source:"grandmother",
    category:"dinner",
    image_url:"https://www.thewholesomedish.com/wp-content/uploads/2019/06/The-Best-Classic-Tacos-550.jpg",
    steps:[
        {
          description:"cook them",
          ingredients:[
              {
                  ingredient_name:"taco shell",
                  amount:10,
                  unit:"none"
              },
              {
                  ingredient_name:"miced beef",
                  amount:125,
                  unit:"gram"
              }
            ]
        }
    ]
}
const invalid2 = {
    user_id:1,
    source:"grandmother",
    recipe_name:"tacos",
    category:"dinner",
    image_url:"https://www.thewholesomedish.com/wp-content/uploads/2019/06/The-Best-Classic-Tacos-550.jpg",
    steps:[
        {
          description:"cook them",
          ingredients:[
              {
                  ingredient_name:"taco shell",
                  amount:10,
                  unit:"none"
              },
              {
                  ingredient_name:"miced beef",
                  amount:125,
                  unit:"gram"
              }
            ]
        }
    ]
}
const invalid3 = {
    user_id:1,
    // source:"grandmother",
    recipe_name:"tacos",
    category:"dinner",
    image_url:"https://www.thewholesomedish.com/wp-content/uploads/2019/06/The-Best-Classic-Tacos-550.jpg",
    steps:[
        {
          description:"cook them",
          ingredients:[
              {
                  ingredient_name:"taco shell",
                  amount:10,
                  unit:"none"
              },
              {
                  ingredient_name:"miced beef",
                  amount:125,
                  unit:"gram"
              }
            ]
        }
    ]
}
module.exports = {
    invalid3
}