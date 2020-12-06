const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
    {
        content: String,
        name: String,
        to:String,
        from:String
      }, {
        timestamps: true,
      }
);

module.exports = Msg = mongoose.model("chats",ChatSchema);