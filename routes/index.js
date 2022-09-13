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

//GET login route
router.get('/login', (req, res, next) => {
  res.render('login.hbs');
})


//POSt login route
router.post('/login', (req, res, next) => {
  console.log('SESSION =====> ', req.session);

  const myUsername = req.body.username;
  const myPassword = req.body.password;

User.findOne({
  username: myUsername
})
.then(foundUser => {

  //user not found
  if(!foundUser) {
    res.send('no user matching this username');
    return;
  }

//compare passwords
const isValidPassword = bcryptjs.compareSync(myPassword, foundUser.password)

//password is invalid
 if(!isValidPassword){
  res.send('incorrect password');
  return;
 }

 req.session.user = foundUser;

      res.redirect('/profile')

 })
 .catch(err => {
  res.send(err)
})
})

router.get('/profile', (req, res, next) => {
  console.log(req.session.user)
  if(req.session.user){
    res.render('profile.hbs', { username: req.session.user.username})
  } else {
    res.render('profile.hbs', { username: 'Anonymous' });
  }
  
});

module.exports = router;
