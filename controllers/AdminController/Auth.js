require('dotenv').config()
const RegisterModel = require('../../models/register')
const jwt = require('jsonwebtoken')
const {GenerateJwtToken} = require("../../function/GenerateJwt")
const { Createcookie,Clearcookie } = require('../../function/GenerateCookie')
const userCollection=require("../../models/register") 
const bcrypt = require('bcrypt')

//Register controller

const Register= async(req,res)=>{
    try{
        const {name,email,password}=req.body
        if(name && email && password){

            const bPassword = await bcrypt.hash(password,parseInt(process.env.SALTROUND))
            const registers =new userCollection({
                name: name,
                email: email,
                password: bPassword,
                role:2002
            })
            const response = await registers.save();
            res.json({msg:"User Registered",data:registers}).status(201)
        }
        else{
            res.json({msg:"Field Missing"}).status(300)        
        }
        
    }catch(err){
        console.log("Error in Register Controller",err)
        res.json("Error in Register Controller").status(400)
    }
    }
const Login =async(req,res)=>{

     try {

    const {email,password}=req.body
    const foundUser = await RegisterModel.findOne({email:email})
    const compare = await bcrypt.compare(password,foundUser.password)

    if(compare){     
            const token =await GenerateJwtToken(foundUser._id);
            const cookieRes=  Createcookie(token,res)
        if(cookieRes){
            foundUser.token=[...foundUser.token,token]
            await foundUser.save()
            res.json({msg:"Login Successfull",data:foundUser}).status(200)
        }
    else{     
        res.json({msg:"cookie not created"}).status(400)
    }
  }       
    } catch (error) {
        console.log("Error in Login Controller",error)
        res.json("Error in Login Controller").status(400)
     }
}


const UpdateProfile = async(req,res)=>{
    try{
        const {name,email,password,prevPassword} = req.body;

        const id = req.params['id'];
       
        const response = await RegisterModel.findOneAndUpdate({_id:id},{$set:{name,email}})
        if(password){
             const userFound = await  RegisterModel.findOne({_id:id});
             if(userFound.password == prevPassword ){
                 const response = await RegisterModel.findOneAndUpdate({_id:id},{$set:{password:password}}) 
                 res.json({msg:"Data Updated"}).status(201) 
                             
             }   
             else{
                res.json({msg:'Password doesnt match'}).status(300)
             }
        }
        
    }catch{
        console.log("Error in Update Profile Controller")
        res.json("Error in Update Profile Controller").status(400) 
    }
}    

const Logout = async(req,res)=>{

    try {   
        const id = req.params['id'];
        const response  =await Clearcookie(req,res);
        console.log(response)
      if(response)
        res.json({msg:"User Logout"}).status(200)
        else
        res.json({msg:"Issue in Logout"}).status(400)
    } catch (error) {       
        console.log("Error in Logout Controller")
        res.json("Error in logout Controller").status(400) 
    }
}


module.exports = {Register,Login,Logout,UpdateProfile}