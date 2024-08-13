const { users } = require("../model");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const sendEmail = require("../services/sendEmail");

exports.renderregister = (req,res)=>{
    res.render('register')
}
exports.renderlogin = (req,res)=>{
    res.render("login.ejs")
    }
    



exports.registerp = async(req,res)=>{
    // const email = req.body.email;
    // const password = req.body.password;
    // const username = req.body.username;
    const {email ,password ,username ,confirmPassword} = req.body
    console.log(email,password,username,confirmPassword)
    if(!password || !email ||!username){
        return res.send("invalid input");
    }
    if(password!==confirmPassword){
        console.log("wrong password")
       return res.send("password and confirm password doesn't matches")
    }
    const checking = await users.findAll({
        where:{
            email:email,
        }
    })
    if(checking.length==0){


    await users.create({
        email:email,
        password:bcrypt.hashSync(password,8) ,
        username:username,    
    })
    res.redirect('/login')
}
else{
    return res.send("user already exist ")
}
    
}

exports.loginp =async(req,res)=>{
    const {email,password} =req.body
    console.log(req.body)
    if(!email && password){
        return res.send("invalid input");
    }
    
   const avail= await users.findAll({
        where:{
            email:email,
        }
    })
    if(avail.length===0){
        // search if it doesn't consist of the email 
        return res.send("user not found");
    }
    else{
//  now we have to find the length and verify 
        console.log(avail.length)
        console.log(avail[0])
        // let store the email and verify the password too 
        let email1 = avail[0].email
        let password1 = avail[0].password
        if(email===email1){
            if(bcrypt.compareSync(password,password1)){
                //generate token 
               const token= jwt.sign({id:avail[0].id},process.env.SECRETKEY,{expiresIn:"30d"})
            //    res.cookie('token',token,{secure:true}, {expires :120}) 
            res.cookie('token',token)
                // console.log(process.env.SECRETKEY)
                console.log("Token :"+ token)
                res.redirect('/')
            }
            else{
                return res.send("password doesn't matches")
            }
        }
    }
}
exports.logOut =(req,res)=>{
    res.clearCookie('token') // name of the token
    res.redirect('/login')
}
exports.renderForgetPassword = (req,res)=>{
   res.render("forgetpassword")
}
exports.SendOTP = async (req,res)=>{
    
    const email = req.body.email
    //aako email 
    if(!email){
        return res.send("Please provide the email");
    }
   
       const emailfind = await users.findAll({
            where :{
                email : email
            }
        })


    if (emailfind.length==0){
        return res.send("sorry your email is not register")
    }
    // const emailExists = emailfind[0].email
    // lets send the otp to the already register user 
    else{
   
     

         await  sendEmail({
             email:email, // aako email ma it will call function sendEmail service /
             subject : "forget password",
             otp : 2342 
            })
        }
        res.send("email sent sucessfully");
    }
    /*
    in order to send it all to the email user 
    we have to store the emails in the array of any 
    kind of the data structure and we have to apply loop on it 
    let suppose 
    let userAccount = [ ..... ]
    for(let i =0;i<userAccount.length;i++){
     await  sendEmail({
            email:userAccount[i].email, // aako email ma it will call function sendEmail service /
            subject : "forget password ", // it can be change to notification and all 
            otp : 23433
        })
        res.send("email sent sucessfully");
    }
    
    
*/