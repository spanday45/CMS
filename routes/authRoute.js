const { registerp ,renderregister, renderlogin,loginp }= require("../controller/userController");

const router = require("express").Router()
// in order to import we have to export from controller
router.route('/login').get(renderlogin).post(loginp)
router.route('/register').get(renderregister).post(registerp)
module.exports =router;