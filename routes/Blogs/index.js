const express = require('express')
const {VerifyAdmin} = require('../../Middleware/AdminAuth')
const Route = express.Router();
const { ViewBlog, UpdateBlog, DeleteBlog, AddNewBlog } = require('../../controllers/AdminController/Blogs');
const multer = require("multer")
const path = require('path');

const storage = multer.diskStorage({
    destination: './Public/uploads/blogfeaturedImage',
    filename: function (req, file, cb) {
        cb(null,"category_"+ file.fieldname + '-' + Date.now() + 
    path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage })

// Blog Endpoint
Route.route("/").get(ViewBlog).post([VerifyAdmin,upload.single("fImage")],AddNewBlog);

Route.route("/:id").patch([VerifyAdmin,upload.single("fImage")],UpdateBlog).delete([VerifyAdmin],DeleteBlog)



module.exports = Route;