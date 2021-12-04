const mongoose = require('mongoose')

const friendSchema = new mongoose.Schema({
    name: String,
    bestLine: String,
    age:Number,
    skills:String,
})

const Friend = mongoose.model('friend', friendSchema)

module.exports = Friend;