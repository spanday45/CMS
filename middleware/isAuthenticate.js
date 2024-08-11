const jwt = require('jsonwebtoken')
const { users } = require('../model')
const promisify  = require('util').promisify
// or const {promisify} = require('util')
// built in util in node js
exports.isAutheticated = async(req,res,next)=>{
console.log(req.cookies.token)
const token =req.cookies.token
// if token is not sent 
if(!token){
    return res.send("First login in order to add blogs");
}
// if send then we have to verify the jwt 
// by verify method 
// const decryptedResult = await jwt.verify(token,process.env.SECRETKEY, callback function )
const decryptedResult = await promisify(jwt.verify)(token,process.env.SECRETKEY,promisify)
console.log(decryptedResult)
// check if that id (userid) user table ma exist xa ki chaina
// received package vaneko object form ma huncha so id lai access garna 
//  . use garincha

const userExist = await users.findAll({
    where:{
        id:decryptedResult.id,
    }
})
console.log(userExist)
if (userExist.length ==0){
    res.send("User doesn't exit sorry cannot process the further steps")
}
else{
    req.user = userExist
    // alternative userExist[0].id
    // convention req.user.id
    req.userId = userExist[0].id
    next();
    

}
}