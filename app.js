const express= require("express") // require and the calling which is store in the app  which is used throughout the project
const { blogs } = require("./model/index")
//blog data table 
const { where } = require("sequelize")
const { renderCreateBlog, allBlogs, createMe, sBlog, login, Editor, updateMe, destroyBlog } = require("./controller/blogController")
const app = express()
//Routes Here 
const blogRoute = require('./routes/blogRoute')
// database connection 

require("./model/index")
app.use(express.static("public/"))
// setting ejs 
app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// app.get('/',allBlogs)
app.use("",blogRoute) // middleware
 
// app.use("/hello",blogRoute) //localhost:3000/hello/blogRoute
// app.get('/createblog',renderCreateBlog)
// //create blogs b
// app.post("/createblog",createMe)
// single blog 
// specific id ko content magnu paro 
// app.get('/single/:id', sBlog)

app.get('/login',login)
app.post('/updateMe/:id',updateMe)

app.get('/editBlog/:id',Editor)
app.get('/deleteBlog/:id',destroyBlog)








app.listen(3000,()=>{
    console.log("Node js is started in 3000")
})