const mongoose = require('mongoose');
const Joi = require("joi")

const SignUpSchema = new mongoose.Schema({
    Name: {
        type:String

    },
    Email:{
        type:String
    },
    Password:{
        type:String
    },
    profileImage:{
        type:String
    },
    active:{
        type:Boolean,
        default:0
    },
    savedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post" 
    }],
    admin:{
        type:Boolean,
        default:0
    }
    

})


const SignUp = mongoose.model("SignUp",SignUpSchema)

function SignUpValidation(object) {
    const schema = Joi.object({
        Name: Joi.string().min(3).max(30).required(),
        Email: Joi.string().email().min(3).max(40).required(),
        Password: Joi.string().min(3).max(40).required(),
        profileImage:Joi.string(),
     
    });

    return schema.validate(object);
}


module.exports =  {SignUp,SignUpValidation};




// const passwordSchema = Joi.string()
//   .min(8)
//   .max(20)
//   .pattern(/[A-Z]/) // يجب أن تحتوي على حرف كبير
//   .pattern(/[0-9]/) // يجب أن تحتوي على رقم
//   .pattern(/[@$!%*?&]/) // يجب أن تحتوي على رمز خاص
//   .required();
