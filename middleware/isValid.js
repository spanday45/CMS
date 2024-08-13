const { users } = require("../model")

exports.isValidate= async(req,res,next)=>{
    const id = req.params.id // from url 
    const userName = req.userId
    const  finidngData= await users.findAll({
        where:{
            id : id
        }
    })
    if(finidngData[0].UserId !==userName){
        return res.send("You cannot edit the post")
    }
    next()
}