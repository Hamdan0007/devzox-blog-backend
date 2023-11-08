const CategoryModel = require('../../models/category')


const ViewCategories = async(req,res)=>{
    
    try{
        const response = await  CategoryModel.find()
        if(response)
        res.json({msg:"Data Sendt",data:response}).status(200)
        else
        res.json({msg:"data not found"}).status(404)
        
    }catch(err){
        console.log("View Categories issue",err)
        res.json({msg:'Got error to find category'}).status(400)
    }
}

const AddNewCategories = async(req,res)=>{
    try{
        const imageFile = req.file.filename;
        const {name,color} = req.body;

        const response = new CategoryModel({
            name,
            color,
            image:imageFile
        })

        await response.save();
        res.json({msg:"Data Saved"}).status(201)

    }catch(err){
        console.log("View Categories issue",err)
        res.json({msg:"Error to upload"}).status(400)
    }

}

const DeleteCategories=async(req,res)=>{
try{
    
    const {id}=req.body 
    await CategoryModel.findOneAndDelete({_id:id})
    res.json({msg:"Category deleted"}).status(201)
}catch(err){
    console.log("error in deleting category",err)

    res.json({msg:"Error in category deletion"}).status(400)
    
}
}

const UpdatCategories= async(req,res)=>{
    try{

        const imageFile = req.file.filename;
        const {name,color} = req.body;
        const id = req.params['id'];
        
        const response = await CategoryModel.findOneAndUpdate({_id:id},{$set:{name,color,image:imageFile}});
        res.json({msg:"Category Updated"}).status(201)

    }catch(err){
        console.log("error in upate categories",err)
        res.json({msg:"Error in Updation"}).status(400)
    }   
}


module.exports = {ViewCategories,AddNewCategories,DeleteCategories,UpdatCategories}