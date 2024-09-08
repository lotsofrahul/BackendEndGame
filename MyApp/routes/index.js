var express = require("express");
var router = express.Router();
const user3Model = require("../routes/users.js")
const userModel = require("../mongodb/User.js");
const user2Model = require("../mongodb/User2.js");
const passport = require('passport');
const localStrategy = require('passport-local');

passport.use(new localStrategy(user3Model.authenticate()));

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.get("/about", (req, res) => {
  res.send("This is about page");
});

router.get("/createuser", async (req, res) => {
  const newUser = await userModel.create({
    name: "Someone with a name",
    username: "lotsofsomeone",
    age: "23",
  });
  res.send("User Created" + `${newUser}`);
});

router.get("/getallusers", async (req, res) => {
  const allUsers = await userModel.find();
  res.send(allUsers);
});

router.get("/getuserwithid/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findOne({ _id: id });
  res.send(user);
});

router.get("/deleteuserwithid/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findOneAndDelete({ _id: id });
  res.send(user);
});

router.get("/savedatainsession", async (req, res) => {
  req.session.ban = true;
  res.send("session updated");
});

router.get("/viewsessiondata", async (req, res) => {
  console.log(req.session);
  res.send("myhistory" + ` ${req.session.ban}`);
});

router.get("/destroysessiondata", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      throw err;
    } else {
      res.send("Session Destroyed");
    }
  });
});

router.get("/savecookie", (req, res) => {
  res.cookie("singer", "Justin Bieber");
  res.send("cookie set");
});

router.get("/getcookie", (req, res) => {
  console.log(req.cookies);
  res.send("Cookie : " + `${req.cookies.singer}`);
});

router.get("/clearcookie", (req, res) => {
  res.clearCookie("singer");
  res.send("Cookie cleared");
});

router.get("/setflash", (req, res) => {
  req.flash("car", "Toyota");
  req.flash("bike", "TVS");
  res.send("Flash has been set");
});

router.get("/checkflash", (req, res) => {
  console.log(req.flash("car"), req.flash("bike"));
  res.end();
});

router.get("/createuser2", async (req, res) => {
  const newuser = await user2Model.create({
    username: "qwekldhfkjsdhfrty",
    nickname: "qwjgfffgfdgdfgerty",
    description: "qwertyuljefkndwoswfjreidneiiop",
    categories: ["qwe", "rty", "fd"],
  });
  res.send(newuser);
});

router.get("/getallusers2", async (req, res) => {
  const findusers = await user2Model.find();
  res.send(findusers);
});

router.get("/searchuser2", async (req, res) => {
  const regex = new RegExp("^qwErty$", "i");

  const finduser = await user2Model.find({
    username: regex,
  });
  res.send(finduser);
});

router.get("/searchuser2withcategories", async (req, res) => {
  const finduser = await user2Model.find({
    categories: { $all: ["qwe", "rty"] }, //all values should be present (AND operation)
  });
  res.send(finduser);
});

router.get("/getuser2withminmaxlength", async (req, res) => {
  const finduser = await user2Model.find({
    $expr: {
      $and: [
        { $gte: [{ $strLenCP: "$nickname" }, 5] },
        { $lte: [{ $strLenCP: "$nickname" }, 9] },
      ],
    },
  });

  res.send(finduser);
});

module.exports = router;
