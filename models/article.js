const mongoose = require('mongoose')



   const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'titel is required'],
      

    }, 
    description:{
        type:String,
        required:[true,'description is required'],
        
    },
   
    content:{
        type: String,
        required:[true,'content is required'],
        
    },
    imgName:{
        type: String,
        required:[true,' image name is required'],
    }
   })


   module.exports =articleSchema

   