var express = require('express');
var router = express.Router();
const {adminView, articleView}= require('../controllers/adminController')
const {auth} = require('../middelware/auth')
const multer = require('multer');

const {createArticlePageView,
     createArticle, 
     showArticles,
     UpdateArticleView,
     UpdateArticle,
     deleteArticle}= require('../controllers/articleController')

 let storage =multer.diskStorage({
        destination:function(req,file, cb){
        console.log(file)
          cb(null, 'public/images/')
        },
        filename: function(req,  file,cb){
          cb(null, Date.now()+ file.originalname)
        }
      })
      
      let upload = multer({storage:storage})

/* GET users listing. */
router.route('/', auth)
.get( adminView)


router.route('/articles', auth)
.get(showArticles)

.delete(deleteArticle)



router.route('/createArticle', auth)
.get(createArticlePageView)
.post(upload.single('imgName'),createArticle)


router.route('/articles/updateArticle', auth)
.get(UpdateArticleView)
.post(upload.single('imgName'), UpdateArticle)
module.exports = router;
