const express= require("express") // require and the calling which is store in the app  which is used throughout the project
const { blogs } = require("./model/index")
const {users} = require("./model/index")
const cookieParser = require('cookie-parser')
//blog data table 
require('dotenv').config()//requiring dotenv and installazing it with default configuration 
const bycrypt = require('bcrypt')
const { where } = require("sequelize")
const { renderCreateBlog, allBlogs, createMe, sBlog, login, Editor, updateMe, destroyBlog } = require("./controller/blogController")
const app = express()
//Routes Here 
const blogRoute = require('./routes/blogRoute')
// database connection 
const authRoute = require('./routes/authRoute')
require("./model/index")
app.use(express.static("public/"))
// setting ejs 
app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use((req,res,next)=>{
// res.locals.name ="sushil" // it will be global name is a variable name it can be accessed from everywhere
res.locals.currentUser = req.cookies.token
next()
})
// it tiger eveytime
// app.get('/',allBlogs)
app.use("",blogRoute) // middleware
app.use("",authRoute)
// app.use("/hello",blogRoute) //localhost:3000/hello/blogRoute
// app.get('/createblog',renderCreateBlog)
// //create blogs b
// app.post("/createblog",createMe)
// single blog 
// specific id ko content magnu paro 
// app.get('/single/:id', sBlog)

// app.get('/login',login)
// app.post('/updateMe/:id',updateMe)

// app.get('/editBlog/:id',Editor)
// app.get('/deleteBlog/:id',destroyBlog)



app.use(express.static('uploads/'))





app.listen(3000,()=>{
    console.log("Node js is started in 3000")
})
// to clear git cached we have to 
// git  rm -r --cached file/foldername