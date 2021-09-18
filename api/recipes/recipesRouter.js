const router = require("express").Router();

router.get("/:user_id/recipes",(req,res,next)=>{
    try{
        res.end();
    }
    catch(e){
        next(e);
    }
});

router.post("/:user_id/recipes",(req,res,next)=>{
    try{
        res.end();
    }
    catch(e){
        next(e);
    }
});

router.get("/:user_id/recipes/:recipe_id",(req,res,next)=>{
    try{
        res.end();
    }
    catch(e){
        next(e);
    }
});

router.update("/:user_id/recipes/:recipe_id",(req,res,next)=>{
    try{
        res.end();
    }
    catch(e){
        next(e);
    }
});

router.delete("/:user_id/recipes/:recipe_id",(req,res,next)=>{
    try{
        res.end();
    }
    catch(e){
        next(e);
    }
});

module.exports = router;