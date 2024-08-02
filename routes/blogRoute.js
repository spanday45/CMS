const { renderCreateBlog, createMe, sBlog, updateMe, Editor, destroyBlog } = require('../controller/blogController');

const router = require('express').Router()
//for routing 
// router.route('/').get('allBlogs')
//restful api 
router.route("/").get(allBlogs)
router.route('/createblog').get(renderCreateBlog).post(createMe)
router.route('/single/:id').get(sBlog)
router.route('/login',login)
router.route('/updateMe/:id',updateMe)
router.edit('/editMe/:id',Editor)
router.edit('/deleteMe/:id',destroyBlog)
// if we have a two same verbs we can use in the same line two verbs 
module.exports =router;