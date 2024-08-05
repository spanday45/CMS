const { renderCreateBlog, createMe, sBlog, updateMe, Editor, destroyBlog, allBlogs, login } = require('../controller/blogController');

const router = require('express').Router()
//for routing 
// router.route('/').get('allBlogs')
//restful api 
router.route("/").get(allBlogs)
router.route('/createblog').get(renderCreateBlog).post(createMe)
router.route('/single/:id').get(sBlog)

router.route('/updateMe/:id').post(updateMe)
router.route('/editMe/:id').get(Editor)
router.route('/deleteMe/:id').get(destroyBlog)
// if we have a two same verbs we can use in the same line two verbs 
// we can make it restful api to by 
// router.route("/:id").get( Blog).post(updateMe) -> not recommended

module.exports =router;