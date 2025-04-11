const mongoose = require('mongoose')
const Joi = require("joi")


const OpinionSchema = new mongoose.Schema({
    Name:{
        type:String,
    },
    Email:{
        type:String,
    },
    Phone:{
        type:String,
    },
    Age:{
        type:String,
    },
    Comment:{
        type:String,
    },
})

const Opinion= mongoose.model("Opinion",OpinionSchema )


function OpinionValidation(object) {
    const schema = Joi.object({
        Name: Joi.string().min(3).max(30).required(),
        Email: Joi.string().email().min(3).max(40).required(),
        Phone: Joi.string().min(2).max(12).allow('', null),
        Age: Joi.string().min(1).max(2).allow('', null), // السماح بالقيمة الفارغة أو غير الموجودة
        Comment: Joi.string().min(5).max(103).required(),
        //53
    });

    return schema.validate(object);
}

  



module.exports=  {Opinion ,OpinionValidation}
