const express = require("express");
const app = express();
const mongoose = require("mongoose");
const http = require('http').createServer(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require('path');
const Msg = require("./models/Chat");

app.use(cors());
const io = require("socket.io")(http);

const users = require("./routes/api/users");

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB

mongoose.set('useFindAndModify', false);

mongoose
  .connect(
    db,
    { useNewUrlParser: true,
      useUnifiedTopology: true  }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

  app.use(passport.initialize());

  require("./config/passport")(passport);

  app.use("/api/users",users);

  if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
  }

  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  io.on('connection', (socket) => {

    socket.on('join',(info)=>{
      socket.join(info.temail);
      tofromarr = [];
      tofromarr.push(info.temail);
      tofromarr.push(info.femail);

      Msg.find({to: {$in:tofromarr},from:{$in:tofromarr}}).sort({createdAt: 1}).limit(15).exec((err, messages) => {
        if (err) return console.error(err);
        // Send the last messages to the user.
        socket.emit('init', messages);
      });
      
    });
  
    // Listen to connected users for a new message.
    socket.on('message', (msg) => {
      // Create a message with the content and the name of the user.
      const message = new Msg({
        name: msg.name,
        content: msg.content,
        to:msg.to,
        from:msg.from
      });
      // Save the message to the database.
      message.save((err) => {
        if (err) return console.error(err);
      });
      // Notify all other users about a new message.
      socket.broadcast.emit('push', message);
    });
  });

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
http.listen(port, () => console.log(`Server up and running on port ${port} !`));