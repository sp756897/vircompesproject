const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IdeaSchema = new Schema(
    {
        iname:{
            type:String,
            required:true
        },
        icontent:{
            type:String,
            required:true
        },
        iemail:{
            type:String
        },
        trmembers:{
            type:[String],
        },
        tamembers:{
            type:[String],
        },
    }
);
module.exports = NewIdea = mongoose.model("ideas",IdeaSchema);