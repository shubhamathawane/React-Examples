const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
port = process.env.PORT;

const MongoUri = process.env.MONGO_URL;
mongoose
  .connect(MongoUri, {
     config: { autoIndex: true },
    })
  .then(console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(port, () => {
    console.log(`Connected on Port ${port}`);
})

app.get('/', (req, res) => {
    res.send("Hello all");
})