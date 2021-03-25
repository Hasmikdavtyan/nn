const model = require("../models/article")
const mongoose = require('mongoose')
  
const Article = mongoose.model('article', model)




class ArticleController{
 createArticlePageView(req,res){
     res.render('components/createArticle')
 }

  async createArticle(req,res){

    await Article.create({
        title:req.body.title,
        description: req.body.description,
        content:req.body.content,
        imgName:req.file.filename
    })
     return res.redirect('/admin/articles')
 }

 async showArticles(req, res){
     console.log(req.query)
   if(req.query.id){
    
    let articles = await Article.findOne({_id:req.query.id}).lean().catch((err)=>{throw err})
    res.render('components/oneArticle', {articles:articles})
   } 
    
    
      let data = await Article.find().catch((err)=>{throw err})
      res.render('components/articles',{data:data})}

 



 async deleteArticle(req,res){
    
    let data = await Article.deleteOne(req.body)
    return res.json(data)
 }
 

async UpdateArticleView(req,res){
  console.log(req.query)
  let articles = await Article.findOne({_id:req.query.id}).lean().catch((err)=>{throw err})
  res.render('components/updateArticle', {articles:articles})
}

async UpdateArticle(req,res){
  let img =''
  if( req.file){
    img = req.file.filename
   }else{
     img = req.body.image
   }
  await Article.updateOne({
    title:req.body.title,
    description: req.body.description,
    content:req.body.content,
    imgName:img
})
 return res.redirect('/admin/articles')
}

 // let articles = await Article.findOne({_id:req.query.id}).lean().catch((err)=>{throw err})
  //res.render('components/updateArticle', {articles:articles})



}

 
module.exports= new ArticleController()