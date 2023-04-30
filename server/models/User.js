const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');


// Derive Schema

const userSchema = new mongoose.Schema({
   userName : {type: String, required:true},
    email: {type:String, required:true},
    password: {type: String, required: true}
});


// Token Generation

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY,{expiresIn:"7d"});
    return token;
}


// Compile Schema to Model
const User = mongoose.model("user", userSchema);

// Validate data

const validate = (data) =>{
    const schema = joi.object({
        userName:joi.string().required().label("userName"),        
        email: joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password")
    });
    return schema.validate(data);
}

module.exports = {User, validate};