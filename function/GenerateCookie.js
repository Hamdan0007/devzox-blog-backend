const RegisterModel=require("../models/register")
const jwts = require('jsonwebtoken')

const Createcookie=(jwt,res)=>{
    res.cookie("jwt",jwt,{
        httpOnly:true,
        sameSite:"none"
    })

return true
}

const Clearcookie=async(reqs,ress)=>{
    try{
    const {jwt} = reqs.cookies
    console.log(jwt);
    const {id} =await jwts.verify(jwt,process.env.SECRETKEY);
    const foundUser = await RegisterModel.findOne({_id:id});
    // console.log("idddd",foundUser)
    //remove token from database
    foundUser.token = foundUser.token.filter((tk)=>{
        return tk != jwt
    })
    await foundUser.save();

    // remove token on browser
    ress.clearCookie("jwt",{
        httpOnly:true,
        sameSite:'none'
    })
    return true
}catch(err){
    console.log('clear cookie',err)
}
}

module.exports={Createcookie,Clearcookie}