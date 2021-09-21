const {body,param,validationResult} = require("express-validator");
const db = require("../../data/data-config");

const checkValidation = (status,message) =>{
    try{
        return (req,res,next)=>{
            const errors = validationResult(req);
            if(errors.isEmpty()){
                next();
            }
            else{
                const {msg} = errors.array()[0]
                res.status(status).json({message: message||msg.message || msg});
            }
        };
    }
    catch(e){
        next(e);
    }
};
const recipeMustExist = [
    param("recipe_id").toInt().custom((recipe_id,{req})=>{
        try{
            return db("recipes")
            .where({recipe_id})
            .first()
            .then((recipe)=>{
                if(recipe){
                    req.recipe = recipe;
                    return true;
                }
                else{
                    return false;
                }
            });
        }
        catch(e){
            next(e);
        }
    }),
    checkValidation(404,"recipe_id not found")
];

const recipeNameMustNotExist = [
    body("recipe_name").isString().custom(recipe_name=>{
        try{
            return db("recipes")
            .where({recipe_name})
            .first()
            .then((recipe)=>{
                return recipe;
            })
        }
        catch(e){
            next(e);
        }
    }),
    checkValidation(400,"recipe_name already exists")
];
const user_idMustExist = [
    param("user_id").toInt().custom((user_id,{req})=>{
        try{
            return req.decoded.user_id === user_id;
        }
        catch(e){
            next(e);
        }
    }),
    checkValidation(404,"user_id not found")
];
const recipeMustBelongToUser = [
    param("user_id").toInt().custom((user_id,{req})=>{
        try{
            if(req.recipe.user_id !== user_id){
                return false;
            }
            return true;
        }
        catch(e){
            next(e);
        }
    }),
    checkValidation(401,"this recipe does not belong to you")
];

const validateRecipePayload = [
    body("source").isString().trim().toLowerCase().isLength({min:1}),
    body("category").isString().trim().toLowerCase().isLength({min:1}),
    body("recipe_name").isString().trim().toLowerCase().isLength({min:1}),
    body("image_url").optional().trim().isURL().isLength({min:1}),
    body("steps").isArray(),
    body("steps.*.description").isString().trim().isString().isLength({min:1}),
    body("steps.*.ingredients").isArray(),
    body("steps.*.ingredients.*.ingredient_name").isString().trim().toLowerCase().isLength({min:1}),
    body("steps.*.ingredients.*.amount").isNumeric({min:0}),
    body("steps.*.ingredients.*.unit").optional().isString().trim().toLowerCase().isLength({min:1}),
    checkValidation(400,"invalid recipe object")
];


module.exports = {
    recipeMustExist,
    recipeNameMustNotExist,
    user_idMustExist,
    recipeMustBelongToUser,
    validateRecipePayload
}