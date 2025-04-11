const mongoose = require('mongoose')
const Joi = require("joi")


const InteractionSchema = new mongoose.Schema({
    Comment:{
        type:String,
    },

    PostID:{
        type:String,
    },
   
   
})

const Interaction= mongoose.model("Interaction",InteractionSchema )


function InteractionValidation(object) {
    const schema = Joi.object({
        Comment: Joi.string().min(3).max(60),
        PostID: Joi.string().min(3).max(60),
    });

    return schema.validate(object);
}

  



module.exports=  {Interaction ,InteractionValidation}
