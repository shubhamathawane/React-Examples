const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

var User = mongoose.model("user", userSchema);
module.exports = User;
