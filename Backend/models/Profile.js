const mongoose = require("mongoose");
const Joi = require("joi")

const ProfileSchema = new mongoose.Schema({

  userID:{
    type: String,


  },

  Age: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },

  Phone: {
    type: String,
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
}
  

} ,{ timestamps: true });




const Profile = mongoose.model("Profile", ProfileSchema);

function ProfileValidation(object) {
  const schema = Joi.object({
    userID: Joi.string(),
    Age: Joi.string().min(1).max(2).required(),
    Address: Joi.string().min(3).max(40).required(),
    Phone: Joi.string().min(3).max(40).required(),
    Gender: Joi.string().required(),
    major: Joi.string().required(),
    username: Joi.string().required(),
  });
  return schema.validate(object);
}


module.exports = {Profile,ProfileValidation};
