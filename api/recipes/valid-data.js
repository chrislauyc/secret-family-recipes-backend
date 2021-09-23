const valid1 = {
    source:"grandmother",
    category:"dinner",
    recipe_name:"tacos",
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
const valid2 = {
    user_id:1,
    source:"grandmother",
    category:"dinner",
    recipe_name:"tacos",
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
const valid3 = {
    source:"grandmother",
    category:"dinner",
    recipe_name:"tacos",
    image_url:"https://www.thewholesomedish.com/wp-content/uploads/2019/06/The-Best-Classic-Tacos-550.jpg",
    steps:[
        {
            description:"cook them",
            ingredients:[
                {
                    ingredient_name:"taco shell",
                    amount:10,
                    // unit:"none"
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
    valid1,
    valid2,
    valid3
}