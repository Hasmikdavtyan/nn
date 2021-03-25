var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')

const model = require('../models/article')
const Article = mongoose.model('article', model)
const {
  showArticles,
 
  }= require('../controllers/articleController')

/* GET home page. */
router.get('/', async function(req, res, next) {
  await Article.find().then(articles=>{
    res.render('index', {articles: articles} );
  }).catch(e => {
    res.send(404).send(err)
  })
  
});




module.exports = router;
