const mongoose=require("mongoose")

const blogSchema=mongoose.Schema({
    categoryId:{
        type: mongoose.Types.ObjectId,
        require:true,
    },
    featuredImage:{
      type: String,
      require:true  
    },
    title:{
        type:String,
        require:true
    },
    subTitle:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    },
    meta:{
        keyword:{
            type:String,
            default:"information Security,devzox,blog"
        },
        lang:{
            type:String,
            default:"en"
        },
        description:String,
        author:{
            type:String,
            default:'devzox'
        },

    }


})

const BlogModel=mongoose.model("blog",blogSchema)

module.exports=BlogModel