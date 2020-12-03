const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Userschema = new Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    },
    trmembers:{
        type:[String],
    },
    tamembers:{
        type:[String],
    },
});

module.exports= User = mongoose.model("users",Userschema);