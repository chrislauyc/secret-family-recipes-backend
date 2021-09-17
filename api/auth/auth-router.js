const router = require("express").Router();
const usersModel = require("../users/usersModel");
const {
    validateLoginPayload,
    validateRegisterPayload,
    usernameMustNotExist,
    usernameMustExist
} = require("./auth-middlewares");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("./secrets");

router.post("/register",validateRegisterPayload, usernameMustNotExist, async(req,res,next)=>{
    try{
        req.body.password = bcrypt.hashSync(req.body.password);
        const [user_id] = await usersModel.insert(req.body);
        if(user_id){
            res.status(201).json({
                user_id,
                username:req.body.username,
                message:"registration successful"
            })
        }
    }
    catch(e){
        next(e);
    }
});

router.post("/login", validateLoginPayload, usernameMustExist, (req,res,next) => {
    try{
        const isValid = bcrypt.compareSync(req.body.password,req.user.password);

        if(isValid){
            const {user_id,username,email} = req.user;
            const payload = {
                username,
                email
            };
            const options = {
                expiresIn: '1d', // show other available options in the library's documentation
            };
            const token = jwt.sign(payload, JWT_SECRET, options);
            res.status(200).json({
                user_id,
                username,
                token,
                message: "login successful"
            })
        }
        else{
            res.status(401).json({message:"username or password incorrect"});
        }
    }
    catch(e){
        next(e);
    }
});

module.exports = router;