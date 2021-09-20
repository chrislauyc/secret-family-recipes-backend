const router = require("express").Router();
const { restricted } = require("../auth/auth-middlewares");
const {
    recipeMustExist,
    recipeNameMustNotExist,
    user_idMustExist,
    recipeMustBelongToUser,
    validateRecipePayload
} = require("./recipes-middlewares");
const recipesModel = require("./recipesModel");
router.get(
    "/:user_id/recipes",
    restricted,
    user_idMustExist,
    async(req,res,next)=>{
    try{
        res.status(200).json(await recipesModel.get(req.decoded.user_id));
    }
    catch(e){
        next(e);
    }
});

router.post(
    "/:user_id/recipes",
    restricted,
    user_idMustExist,
    validateRecipePayload,
    recipeNameMustNotExist,

    async(req,res,next)=>{
    try{
        const [recipe_id] = await recipesModel.insert(req.body);
        res.status(201).json({recipe_id,message:"recipe added successfully"});
    }
    catch(e){
        next(e);
    }
});

router.get(
    "/:user_id/recipes/:recipe_id",
    restricted,
    user_idMustExist,
    recipeMustExist,
    recipeMustBelongToUser,

    (req,res,next)=>{
    try{
        res.status(200).json(req.recipe);
    }
    catch(e){
        next(e);
    }
});

router.put(
    "/:user_id/recipes/:recipe_id",
    restricted,
    user_idMustExist,
    recipeMustExist,
    recipeMustBelongToUser,
    async(req,res,next)=>{
    try{
        const [recipe_id] = await recipesModel.update(req.body,req.params.recipe_id);
        res.status(200).json({recipe_id,message:"recipe updated successfull"});
    }
    catch(e){
        next(e);
    }
});

router.delete(
    "/:user_id/recipes/:recipe_id",
    restricted,
    user_idMustExist,
    recipeMustExist,
    recipeMustBelongToUser,
    async(req,res,next)=>{
    try{
        const [recipe_id] = await recipesModel.remove(req.params.recipe_id);
        res.status(200).json({recipe_id,message:"recipe deleted successfully"});
    }
    catch(e){
        next(e);
    }
});

module.exports = router;