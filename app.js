const express= require("express") // require and the calling which is store in the app  which is used throughout the project
const { blogs } = require("./model/index")
const { where } = require("sequelize")
const app = express()
// database connection 

require("./model/index")

// setting ejs 
app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',async(req,res)=>{
    const allBlogs=  await blogs.findAll()
    console.log(allBlogs)
    
    //allBlogs is array vitra object
    res.render("blogs",{blogs:allBlogs})
    // console.log(allblogs.length)
})
app.get('/createblog',(req,res)=>{
    res.render("createBlog")
    // in api we use 
    // res.json{
    //     status : 200,
    //     message:"hello world",
    // }
})

//create blogs b
app.post("/createme", async  (req,res)=>{
    // first approach
    const title = req.body.title;
    const subTitle =req.body.subtitle;
    const description = req.body.description;
    console.log(req.body)
    // second approach
    // const{title , subTitle, description}= req.body 
    
    await blogs.create({
        title :req.body.title,
        subTitle :subTitle,
        description:description
    })
    // console.log(req.body)
    //in post when the data is send it will located in the
    // req.body

    // res.send("well done req is created sucessfully ")
    res.redirect("/")

})
// single blog 
// specific id ko content magnu paro 
app.get('/single/:id',async(req,res)=>{
    const id = req.params.id // it willhold the number 
    // const {id} = req.params //destructuring 
  const blog = await blogs.findAll( {
        where:{
            id:id
        }
    })
    // second approach
    // const blogs =await blogs.findByPk(id)
    console.log(blog)
   
    res.render("singleBlog.ejs",{sblog : blog})
})











app.listen(3000,()=>{
    console.log("Node js is started in 3000")
})