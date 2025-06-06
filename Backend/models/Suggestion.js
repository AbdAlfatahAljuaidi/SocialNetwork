// models/Suggestion.js
const mongoose = require('mongoose');
const Joi = require('joi')

const suggestionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Suggestion', 'Complaint'],
    required: true
  },
  details: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },

  state:{
    type:String,
    
  },
  title:{
    type:String
  },

  solution:{
    type:String
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});




const Suggest = mongoose.model("Suggest",suggestionSchema)

function SuggestValidation(object) {
    const schema = Joi.object({
        type: Joi.string().required(),
        details: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().required(),
        state:Joi.string(),
        title:Joi.string(),
        solution:Joi.string(),
      
     
    });

    return schema.validate(object);
}



module.exports =  {Suggest,SuggestValidation};
