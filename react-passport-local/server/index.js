const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const User = require("./Models/user");

const MongoUri = "mongodb://localhost/local_passport";
mongoose.connect(MongoUri, { config: { autoIndex: true } });
console.log("MongoDB connected");

// Middleware
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", //location of the react app were connnecting to
    credentials: true,
  })
);

app.use(
  session({
    secret: "anything",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cookieParser("anything"));
app.use(passport.initialize());
app.use(passport.session());
require("./Passport/PassportConfig")(passport);

//===== End of the Middleware =================

// Routes

app.post("/login", (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
      if(err) throw err;
      if(!user) res.send("No user Exists")
      else{
          req.logIn(user, err => {
              if(err) throw err;
              res.send("Successfully Authenticated");
              console.log(req.user);
          })
      }
  })(req, res, next)
});

app.post("/register", (req, res) => {
  console.log(req.body);
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User already Exist");
    if (!doc) {
      const hashedPass = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hashedPass,
      });

      await newUser.save();
      res.send("New user Created");
    }
  });
});

app.get("/user", (req, res) => {
  console.log(req.body);
  res.send(req.user)    // The req.user stores the entire user that has been authenticated inside of it
});

//Starting th server

app.listen(3001, (req, res) => {
  console.log("Server running on port 3001");
});
