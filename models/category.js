const mongoose = require("mongoose");

const CategoriesSchema = mongoose.Schema({
    image:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true,
    },
    color:{
        type:String,
        default:'blue'
    }
})

const CategoryModel=mongoose.model("categorie",CategoriesSchema)

module.exports=CategoryModel;
