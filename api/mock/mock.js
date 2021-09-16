const router = require("express").Router()

const recipes = [
    {
        recipe_id:1,
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
];
const login = {
    user_id:1,
    username:"john",
    token:"mocktokenstring",
    message:"login successful"
}
const register = {
    user_id:1,
    username:"john",
    message:"registration successful"
}
router.post("/auth/login",(req,res,next)=>{
    try{
        res.status(200).json(login);
    }
    catch(e){
        next(e);
    }
});
router.post("/auth/register",(req,res,next)=>{
    try{
        res.status(201).json(register);
    }
    catch(e){
        next(e);
    }
});
router.get("/:user_id/recipes",(req,res,next)=>{
    try{
        res.status(200).json(recipes);
    }
    catch(e){
        next(e);
    }
});

router.post("/:user_id/recipes",(req,res,next)=>{
    try{
        res.status(201).json({recipe_id:1,message:"recipe added successfully"});
    }
    catch(e){
        next(e);
    }
});
router.get("/:user_id/recipes/:recipe_id",(req,res,next)=>{
    try{
        res.status(200).json(recipes[0]);
    }
    catch(e){
        next(e);
    }
});
router.put("/:user_id/recipes/:recipe_id",(req,res,next)=>{
    try{
        res.status(200).json({recipe_id:1,message:"recipe updated successfully"});
    }
    catch(e){
        next(e);
    }
});
router.delete("/:user_id/recipes/:recipe_id",(req,res,next)=>{
    try{
        res.status(200).json({recipe_id:1,message:"recipe deleted successfully"});
    }
    catch(e){
        next(e);
    }
});
module.exports = router;