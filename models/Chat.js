const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
);

module.exports = Msg = mongoose.model("chat",ChatSchema);