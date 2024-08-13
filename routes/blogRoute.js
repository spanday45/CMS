const { renderCreateBlog, createMe, sBlog, updateMe, Editor, destroyBlog, allBlogs, login, rendermyblogs } = require('../controller/blogController');
const { isAutheticated } = require('../middleware/isAuthenticate');
const { isValidate } = require('../middleware/isValid');

const router = require('express').Router()
//for routing 
// router.route('/').get('allBlogs')
//restful api 
const {multer ,storage} = require("../middleware/multerConfig");
const upload = multer({storage:storage});


router.route("/").get(allBlogs)
router.route('/createblog').get(isAutheticated,renderCreateBlog).post(isAutheticated,upload.single('image'),createMe)
router.route('/single/:id').get(isAutheticated,sBlog)

router.route('/updateMe/:id').post(isAutheticated,isValidate,upload.single('image'),updateMe)
router.route('/editMe/:id').get(isAutheticated,Editor)
router.route('/deleteMe/:id').get(isAutheticated,destroyBlog)
// if we have a two same verbs we can use in the same line two verbs 
// we can make it restful api to by 
// router.route("/:id").get( Blog).post(updateMe) -> not recommended
router.route('/myblogs').get(isAutheticated,rendermyblogs)
module.exports =router;