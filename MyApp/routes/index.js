var express = require('express');
var router = express.Router();
const userModel = require('../mongodb/User.js');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/about', (req, res) => {
  res.send("This is about page")
});

router.get('/createuser', async (req, res) => {
  const newUser = await userModel.create({
    name : "Someone with a name",
    username : "lotsofsomeone",
    age : "23"
  });
  res.send("User Created" + `${newUser}`);
});

router.get('/getallusers', async (req, res) => {
  const allUsers = await userModel.find();
  res.send(allUsers);
})

router.get('/getuserwithid/:id', async (req, res) => {
  const id  = req.params.id;
  const user = await userModel.findOne({_id : id});
  res.send(user);
});

router.get('/deleteuserwithid/:id', async (req, res) => {
  const id  = req.params.id;
  const user = await userModel.findOneAndDelete({_id : id});
  res.send(user);
});

router.get('/savedatainsession', async (req, res) => {
  req.session.ban = true;
  res.send("session updated");
});

router.get('/viewsessiondata', async (req, res) => {
  console.log(req.session);
  res.send("myhistory" + ` ${req.session.ban}`);
});

router.get('/destroysessiondata', async (req, res) => {
  req.session.destroy((err) => {
    if(err) {
      throw err;
    }
    else {
      res.send("Session Destroyed");
    }
  })
});

router.get('/savecookie', (req,res) => {
  res.cookie("singer", "Justin Bieber");
  res.send("cookie set");
});

router.get('/getcookie', (req,res) => {
  console.log(req.cookies);
  res.send("Cookie : " + `${req.cookies.singer}`);
});

router.get('/clearcookie', (req,res) => {
  res.clearCookie("singer");
  res.send("Cookie cleared");
});

module.exports = router;
