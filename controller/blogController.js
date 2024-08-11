const { blogs, users } = require("../model");
// control+ space import something  

exports.renderCreateBlog = (req,res)=>{
    res.render("createBlog")
    // in api we use 
    // res.json{
    //     status : 200,
    //     message:"hello world",
    // }
}
exports.createMe =  async(req,res)=>{
    // first approach
    // console.log(req.file.filename)
    const filename = req.file.filename
    const title = req.body.title;
    const subTitle =req.body.subtitle;
    const description = req.body.description;

    // file doesn't comes with the body 
    // const image = req.body.image will extract the name of the image only 
    // console.log(req.body)
    // second approach
    // const{title , subTitle, description}= req.body 
    if  (!title || !subTitle || !description || !req.file){
        return res.send("fill all the input field ")
    }
    await blogs.create({
        title :req.body.title,
        subTitle :subTitle,
        description:description,
        UserId: req.user[0].id,
        image :process.env.PROJECT_URL+filename
       
    })
    // console.log(req.body)
    //in post when the data is send it will located in the
    // req.body

    // res.send("well done req is created sucessfully ")
    res.redirect("/")

}
exports.allBlogs =async(req,res)=>{
    const allBlogs=  await blogs.findAll(
        {
            include:
            {

                model :users
                //users is the name of the table from the model of index .js
                // this is join in the database with sequelize

            }
            

        }
    )
    console.log(allBlogs)
    
    //allBlogs is array vitra object
    res.render("blogs",{blogs:allBlogs})
    // console.log(allblogs.length)
}

exports.sBlog = async(req,res)=>{
    const id = req.params.id // it willhold the number 
    // const {id} = req.params //destructuring 
  const blog = await blogs.findAll( {
        where:{
            id:id
        },
        include: {
        model : users,
        }
    })
    // second approach
    // const blogs =await blogs.findByPk(id)
    console.log(blog)
   
    res.render("singleBlog.ejs",{sblog : blog})
}



    exports.Editor  = async(req,res)=>{
        const id = req.params.id

        const receive  = await blogs.findAll({
            where : {
                id:id
            }
        })
        res.render("edit",{detail:receive})


        console.log(receive)
        
    }

   
    exports.updateMe = async(req,res)=>{
        const id = req.params.id
        const obj = await blogs.findAll(
            {

                where : {
                    id:id
                    
                }
            }
        )
        const title = req.body.title;
        const subTitle = req.body.subTitle;
        const description = req.body.description;
        await blogs.update({
            title :title,
            subTitle: subTitle,
            description:description
        } 
          ,{
            where:{ id:id}
          } 
        )
        res.redirect('/')
    }
exports.destroyBlog  = async(req,res)=>{
    const id = req.params.id; 
   await blogs.destroy({
        where:{
            id:id
        }
    })
    res.redirect('/');
}

exports.rendermyblogs = async(req,res)=>{
    const userid = req.userId
    console.log(userid)
    const  mypersonalblog =await blogs.findAll({
        where:{
             UserId : userid
            }
     })
     console.log(mypersonalblog)
     res.render("rendermyblogs" ,{myblogs:mypersonalblog})
    }