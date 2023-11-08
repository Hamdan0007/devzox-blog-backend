const express = require('express')
const {VerifyAdmin} = require('../../Middleware/AdminAuth')
const Route = express.Router();
const { ViewCategories, AddNewCategories, UpdatCategories, DeleteCategories } = require('../../controllers/AdminController/Categories');
const multer = require("multer")
const path = require('path');

const storage = multer.diskStorage({
    destination: './Public/uploads/',
    filename: function (req, file, cb) {
        cb(null,"category_"+ file.fieldname + '-' + Date.now() + 
    path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage })

// Categories Endpoint
Route.route("/").get(ViewCategories).post([VerifyAdmin,upload.single("image")],AddNewCategories).delete(VerifyAdmin,DeleteCategories);

Route.route("/:id").patch([VerifyAdmin,upload.single("image")],UpdatCategories)


module.exports = Route;