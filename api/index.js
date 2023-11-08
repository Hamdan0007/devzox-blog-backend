require('dotenv').config()
const Db=require("../utility/mongodb")
const helmet = require("helmet");
const express = require('express');
const app = express();
const port = 3000 || process.env.port
const bodyParser = require('body-parser');
const adminApi = require('../routes/Admin');
const CustomerApi = require('../routes/Customer')
const CategoryApi = require('../routes/Blogs/Category')
const BlogApi = require("../routes/Blogs")
const cookieParser = require('cookie-parser');
const path = require('path')
const corsOptions=require("../utility/corsOptions")
const cors=require("cors")
// Middleware

//database is established here
Db();
app.use('/', express.static(path.join(__dirname, 'Public')))

// app.use(express.json())
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

// Routes
app.use('/api/admin', adminApi);
app.use('/api/customer', CustomerApi);
app.use('/api/category',CategoryApi)
app.use('/api/blog',BlogApi)

// testing endpoint
app.get('/',function (req,res){  
  res.status(200).json('Api working fine');
})

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
