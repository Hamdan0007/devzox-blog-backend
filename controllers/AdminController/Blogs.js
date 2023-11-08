const BlogModel = require('../../models/blog')

const ViewBlog = async(req,res)=>{
    
    try{
        const response = await BlogModel.find()
        if(response)
        res.json({msg:"Data Sent",data:response}).status(200)
        else
        res.json({msg:"data not found"}).status(404)
        
    }catch(err){
        console.log("View blog issue",err)
        res.json({msg:'Got error to find blog'}).status(400)
    }

}


const AddNewBlog = async(req,res)=>{
    
    try{
        const imageFile = req.file.filename;
      const {title,subTitle,content,metaKeyword,metaLang,metaDescription,metaAuthor} = req.body;
     const data = new BlogModel(
        {
        fImage:imageFile,
        title,
        subTitle,
        content,
        meta:{
            keyword:metaKeyword,
            lang:metaLang,
            description:metaDescription,
            author:metaAuthor
            }
        }
     )
    const response = await data.save();
    if(response){
       res.json({msg:"Blog Inserted"}).status(201) 
    }    
    else{
        res.json({msg:"Blog not inserted"}).status(400)
    }
    }catch(err){
        console.log("error in insetion blog",err)
        res.json({msg:"Error in blog insertion"}).status(400)     
    }

}

const DeleteBlog=async(req,res)=>{
    try{
        const id = req.params['id'];
        const response = await BlogModel.findOneAndDelete({_id:id})
        if(response)
        res.json({msg:"blog deleted"}).status(201)
        else{
         res.json({msg:"blog not found"}).status(404)
        }
    }catch(err){
        console.log("error in deleting blog",err)
        res.json({msg:"Error in blog deletion"}).status(400)
    }
}

const UpdateBlog=async(req,res)=>{
    try{
        const imageFile = req.file.filename;
        const {title,subTitle,content,metaKeyword,metaLang,metaDescription,metaAuthor} = req.body;

        const id = req.params['id'];
        const response = await BlogModel.findOneAndUpdate({_id:id},{$set:{title,subTitle,content,metaKeyword,metaLang,metaDescription,metaAuthor}});
        res.json({msg:"blog Updated"}).status(201)

    }catch(err){
        console.log("error in update blog",err)
        res.json({msg:"Error in Updation"}).status(400)
    } 
}


module.exports={ViewBlog,AddNewBlog,DeleteBlog,UpdateBlog}
