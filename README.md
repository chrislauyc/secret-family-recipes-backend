# secret-family-recipes-backend

 ### BASE URL

 ```
    https://family-recipes-app.herokuapp.com

 ```

  ## User Accounts

 | Action | Method | Route | Body |
 | ------ | ------ | ----- | ---- |
 | Register/Create | POST | /api/auth/register | { username, email, password}
 | Login | POST | /api/auth/login | {username, password} |

  ### Data Types for Registering the user

 ```json
 {
     "username": "string",
     "email": "string",
     "password": "string"
 }
 ```

  ### Data Types for Logging In the user

 ```json
{
     "username": "string",
     "password": "string"
 }

 ```

 ### Expected Response after successful registration

 ```json
{
    "user_id":1,
    "username":"john",
    "message":"registration successful"
}

 ```

  ### Expected Response after successful Login

 ```json
{
    "user_id":1,
    "username":"john",
    "token":"JWTTokenHerehbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJlbWFpbCI6ImdsQGRjLm9yZyIsIm",
    "message":"login successful"
}
 ```

  ## CRUD for Recipes

 | Action | Method | Route | Required |
 | ------ | ------ | ----- | -------- |
 | Fetch All Recipes of Users | GET | /api/:user_id/recipes | user_id |
 | Fetch Recipe | GET |/api/:user_id/recipes/:recipe_id | recipe_id and user_id |
 | Add New Recipe | POST | /api/:user_id/recipes | user_id|
 | Deletes Recipe | DELETE | /api/:user_id/recipes/:recipe_id | recipe_id and user_id |
 | Updates Recipe | PUT | /api/:user_id/recipes/:recipe_id | recipe_id and user_id |


  ### Data Types for adding and updating recipe

 ```json
{
    "source":"string",
    "category":"string; can be breakfast,lunch,dinner,dessert, or snack)",
    "recipe_name":"string; unique",
    "image_url":"URL",
    "steps":[
        {
            "description":"string",
            "ingredients":[
                {
                    "ingredient_name":"string",
                    "amount":1,//numeric
                    "unit":"string"
                },
                {
                    "ingredient_name":"string",
                    "amount":2,//numeric
                    "unit":"string"
                }
            ]
        }
    ]
};
```

 ### Expected Response after querying for Fetch Recipe

```json
{
    "user_id":1,
    "recipe_id":1,
    "source":"string",
    "category":"string; can be breakfast,lunch,dinner,dessert, or snack)",
    "recipe_name":"string; must be unique",
    "image_url":"URL",
    "steps":[
        {
            "description":"string",
            "ingredients":[
                {
                    "ingredient_name":"string",
                    "amount":2,
                    "unit":"string"
                },
                {
                    "ingredient_name":"string",
                    "amount":4,
                    "unit":"string"
                }
            ]
        }
    ]
};
```

 ### Expected Response after querying for Fetch All Recipes


```json
//returns an array of recipes
 {
     "recipes" : [] 
 }
```


 ### Expected Response after querying for update

 ```json
{
    "recipe_id":1,"message":"recipe updated successfully"
}
 ```
 ### Expected Response after querying for delete

```json
{
    "recipe_id":1,"message":"recipe deleted successfully"
}
```