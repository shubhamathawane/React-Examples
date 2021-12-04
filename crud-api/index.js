const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost/friendDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected.."))
  .catch((err) => console.error(err));

const Friend = require("./Models/Friend");

const port = process.env.PORT || 3001;

// Add a friend
app.post("/friends/add", async (req, res) => {
  try {
    const { name, bestLine, age, skills } = req.body;
    const friend = await new Friend({
      name,
      bestLine,
      age,
      skills,
    });

    const savedFriend = await friend.save();
    res.send(savedFriend);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get One Friend 

app.get("/friends/:friendName", async (req, res) => {
  try {
    const friendName = req.params.friendName;
    const foundFriend = await Friend.findOne({ name: friendName });
    res.send(foundFriend);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get All frinds 

app.get("/friends", async (req, res) => {
  try {
    const friends = await Friend.find();
    res.send(friends);
  } catch (err) {
    res.status(500).json(err);
  }
});


//Update a friend;
app.put('/friend/update/:friendName', async(req, res) => {
    try{
        const friendName = req.params.friendName;
        const { newName, newBestLine, newAge, newSkills } = req.body;
        await Friend.findOneAndUpdate(
            { name:friendName },
            {
                name: newName,
                bestLine: newBestLine,
                age: newAge,
                skills:newSkills,
            },
            {overwrite:true}
        )
        res.status(200).json("Friend updated successfully");
    }catch(err) {
        res.status(500).json(err);
    }
})


app.delete('/friend/delete/:friendName', async(req, res) => {
    try {
        const friendName = req.params.friendName;
        await Friend.findOneAndDelete({name: friendName});
        res.status(200).json("Friend Deleted Succesfully")
    }catch(err) {
        res.status(500).json(err);
    }
})


app.listen(port, () => {
  console.log("Server running on port 3001");
});
