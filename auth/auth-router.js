const router = require('express').Router();

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const secrets = require('../config/secrets')

const Methods = require('./auth-model')

router.post('/register', inputCheck, async (req, res) => {
  // implement registration
  let user = req.body

  const hashPass = bcrypt.hashSync(user.password, 4)
  user.password = hashPass

  try {
    const result = await Methods.register(user)
    res.status(200).json({ result: result })
  }
  catch (err) {
    res.status(500).json({ msg: 'registration error', error: err.message})
    console.log('registration error', err)
  } 
});

router.post('/login', inputCheck, async (req, res) => {
  // implement login

  const { username, password } = req.body;


  Methods.findByUsername(username)
      .then(([user]) => {
        
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user)
          res.status(200).json({ msg: 'Welcome', token });
        } else {
          res.status(401).json({ msg: 'Invalid credentials' });
        }

      })
      .catch(err => {
        res.status(500).json({ msg: 'Login error', error: err.message });
        console.log('login error', err)

      });

});


function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, secrets.jwtSecret, options)
}

// middleware

function inputCheck(req, res, next) {
  const user = req.body

  if (user.username && user.password && typeof user.password === "string") {
      next()
  } else {
      res.status(400).json({ msg: 'Please enter in both a username and password'})
  }
}

module.exports = router;
