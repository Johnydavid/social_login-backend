const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const GoogleUserSchema = new Schema({
  
  displayName: {
    type: String,
    required: true,
  },  
 
  googleId:{
    type:String,
    required:true
  },
  image:{
    type: String,
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const GoogleUser = mongoose.model('GoogleUser', GoogleUserSchema)

module.exports = GoogleUser