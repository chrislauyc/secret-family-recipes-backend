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
const valid4 = {
    source:"mom",
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
const valid5 = {
    source:"mom",
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
                },
                {
                    ingredient_name:"something",
                    amount:125,
                    unit:"gram"
                }
            ]
        }
    ]
}
const valid6 = {
    "source":"grandmother",
    "category":"dessert",
    "recipe_name":"strawberry pretzel salad",
    "image_url":"https://images-gmi-pmc.edge-generalmills.com/fbd3fe36-262c-4441-8dfd-1f9a621174e4.jpg",
    "steps":[
        {
            description:"preheat oven to 350 degrees farenheit",
            ingredients:[]
        },
        {
            description:"crush pretzels and melt butter",
            ingredients:[
                {
                    "ingredient_name":"butter",
                    "amount": 1,
                    "unit":"cup"
                }
            ]
        },
        {
            description:"combine pretzels and spread on bottom of 19 inch pan",
            ingredients:[
                {
                    "ingredient_name":"pretzels",
                    "amount": 1,
                    "unit":"bag"
                },
            ]
        },
        {
            description:"set pan in fridge until pretzel layer has hardened",
            ingredients:[]
        },
        {
            description:"spread cool whip on pretzels",
            ingredients:[
                {
                    "ingredient_name":"cool whip",
                    "amount": 1,
                    "unit":"tub"
                },
            ]
        },
        {
            description:"mix jello and add starberries to jello",
            ingredients:[
                {
                    "ingredient_name":"starberry jelly",
                    "amount": 1,
                    "unit":"box"
                },
                {
                    "ingredient_name":"sliced starberries",
                    "amount": 6,
                    "unit":"oz"
                },
            ]
        },
        {
            description:"gently pour and spread starberry jello mixture on cool whip",
            ingredients:[]
        },
        {
            description:"set dish in fridge until jello layer has set",
            ingredients:[]
        },
        {
            description:"take out and chow down",
            ingredients:[]
        }
    ]
 }
 const valid7 = {
    source:"mom",
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
                },
                {
                    ingredient_name:"something",
                    amount:125,
                    unit:"gram"
                }
            ]
        },
        {
            description:"eat it",
            ingredients:[
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
    valid3,
    valid4,
    valid5,
    valid6,
    valid7
}