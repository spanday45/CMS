const { users } = require("../model");

exports.SendOTP1 = async (req,res)=>{
    
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
     const userAccount=   await users.findAll()
     for(let i =0;i<userAccount.length;i++){

         await  sendEmail({
             email:userAccount[i].email, // aako email ma it will call function sendEmail service /
             subject : "Offer",
             otp : "free resources "
            //  other content  you have to change from the send Email.js 
            })
        }
        res.send("email sent sucessfully");
    }
}