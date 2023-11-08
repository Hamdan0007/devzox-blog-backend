const express = require('express')
const Route = express.Router();
const helmet =require('helmet')
Route.use(helmet());

// controller
const {Register,Login,UpdateProfile,Logout} = require("../../controllers/AdminController/Auth");


Route.get("/",(req,res)=>{
    res.send("Admin enpoint working fine")
})


// Auth Endpoint
Route.post("/login",Login)
Route.route("/register").post(Register)
Route.route("/register/:id").patch(UpdateProfile);
Route.route("/logout").post(Logout)



module.exports = Route;