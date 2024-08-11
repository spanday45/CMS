const { registerp ,renderregister, renderlogin,loginp, logOut }= require("../controller/userController");

const router = require("express").Router()
// in order to import we have to export from controller
router.route('/login').get(renderlogin).post(loginp)
router.route('/register').get(renderregister).post(registerp)
router.route('/logout').get(logOut)
module.exports =router;