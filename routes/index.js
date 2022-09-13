const router = require("express").Router();
const User = require('../models/User.model');
const bcryptjs = require('bcryptjs');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
  console.log('index page is set up')
});

//setup a sign up route
router.get("/signup", (req, res, next) => {
  res.render("signup.hbs")
})

router.post("/signup", (req, res, next) => {
  const myUsername = req.body.username;
  const myPassword = req.body.password;

  const myHashedPassword = bcryptjs.hashSync(myPassword);

User.create({
  username: myUsername,
  password: myHashedPassword
})
  .then (savedUser => {
    res.send(savedUser)
  })
  .catch(err => {
    console.log(err);
    res.send(err);
  })
})

module.exports = router;
