const model = require("../models/user")
const mongoose = require('mongoose')
  
const User = mongoose.model('user', model)


class AdminController{
 registerPage(req, res){
     let message =''
    res.render('components/register.ejs',{message:message})
    console.log(User)

 }

 registerUser(req, res){
    
    if(!req.body.email || !req.body.password){
        res.send('info is invalid')
    }else{
        async  function CreateUser(email, password){
            return new User ({
                email:email,
                password:password
            }).save()
        }
            ( async()=>{
                let user = await User.findOne({email:req.body.email}).catch(err =>{throw err} )
                console.log(user)
                if(!user){
                await CreateUser(req.body.email, req.body.password).then(result=>{
                   console.log(result)
                    return  res.redirect('/login')
                  }).catch(err =>{throw err} )
              }else{
                let message = 'this email was used by another user'
                res.render('components/register.ejs',  {message:message })
              }
            })()
      
    }
    
    
 }
 loginView(req,res){
     let message =''
    res.render('components/login.ejs', {message:message})
}

loginUser(req,res){
    if(!req.body.email || !req.body.password){
        res.render('components/login',{message:'please fill all fields'})
    }else{
    ( async()=>{
        let user = await User.findOne({email:req.body.email}).catch(err =>{throw err} )
        if(!user){
            return  res.render('components/login',{message:'this user is not registered'})
        
      }else{
         await user.comparePass(req.body.password, (err, isMatch)=>{
             if (err) throw err
             if(isMatch){
                 req.session.user = user
                 res.redirect('/admin')
             }
         })
        res.render('components/login.ejs',  {message:message })
      }
    })()
}}

adminView(req,res,next){
    res.render('components/admin.ejs')
}
articleView(req,res){
    res.render('components/articles.ejs')
}

}

module.exports= new AdminController()