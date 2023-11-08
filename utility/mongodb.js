const mongoose=require("mongoose")



const Db=()=>{
    
    mongoose.connect("mongodb+srv://raorehanweb:devzoxdatabase@devzox.xgfiqol.mongodb.net/").then(()=>{
        console.log("Database connection established")
    }).catch((err)=>{
        console.log("Database is not established")
        console.log(err)
    })
}

module.exports=Db


