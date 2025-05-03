const mongoose = require("mongoose");
const Joi = require("joi")

const ProfileSchema = new mongoose.Schema({

  userID:{
    type: String,


  },

  Age: {
    type: Number,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },

  Phone: {
    type: Number,
    required: true,
  },

  Gender: {
    type: String,
    required: true,
  },

  imageUrl: { type: String },

  friends: [
    {
      name: String,
      image: String
    }
  ],
  major:{
    type:String,
    required: true,
    
},
username:{
  type:String,
  required: true,
},

year:{
  type:Number,
  required:true,
},
point:{
  type:Number,
  required:true,

}
  


} ,{ timestamps: true });




const Profile = mongoose.model("Profile", ProfileSchema);

function ProfileValidation(object) {
  const schema = Joi.object({
    userID: Joi.string(),
    Age: Joi.number().min(1).max(99).required(),
    Address: Joi.string().min(3).max(40).required(),
    Phone: Joi.number().min(3).max(40).required(),
    Gender: Joi.string().required(),
    major: Joi.string().required(),
    username: Joi.string().required(),
    year: Joi.number().required(),
  });
  return schema.validate(object);
}


module.exports = {Profile,ProfileValidation};
