const db = require("../../data/data-config");
const getByQuery = (query) =>{
    return db("users").where(query).first();
};

const insert = (user) =>{
    return db("users").insert(user).returning("user_id"); //[id]
};

module.exports = {getByQuery,insert};