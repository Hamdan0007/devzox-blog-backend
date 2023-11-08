const {Roles} = require('../utility/RoleConfig')
const jwt = require('jsonwebtoken')
const RegisterModel = require('../models/register')

const VerifyAdmin = async(req,res,next)=>{
    try{
        const {jwt:token} = req.cookies;
        if(!token){  

            res.json({msg:"UnAuthorized"}).status(403)
        }
            const {id} = await jwt.verify(token,process.env.SECRETKEY);
            const foundUser = await RegisterModel.findOne({_id:id})
            console.log(foundUser,foundUser.role == Roles.Admin)
            if(foundUser.role == Roles.Admin){  
                req.user = foundUser;
                req.token = token;
                next()
            }else{
                res.json({msg:"Unauthorized"}).status(403)
            }     
        
    }catch(err){
        console.log("Error in Admin Verification ",err)
    }
}

module.exports = {VerifyAdmin} 
