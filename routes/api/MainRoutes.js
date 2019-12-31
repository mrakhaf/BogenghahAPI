const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const bcrypt = require('bcryptjs');


router.post('/register', (req, res) => {
  User.create({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      email: req.body.email
    })
    .then((user) => {
      res.json({
        status: 200,
        data: {
          username: user.username,
          msg: 'success create account'
        }
      })
    })
    .catch((err) => res.json(err))
})

router.post('/login', (req, res) => {
  let user = req.body.username;
  let pass = req.body.password;
  User.findOne({
      where: {
        username: user
      }
    })
    .then(result => {
      if (!result) {
        res.json({
          status: 404,
          msg: 'NOT FOUND'
        })
      } else {
        bcrypt.compare(pass, result.password, (err, isMatch) => {
          if (!isMatch) {
            res.json({
              status: 403,
              msg: 'Wrong Password',
            })
          } else {
            res.json({
              status: 200,
              msg: 'Success Login'
            })
          }
          if (err) {
            res.json(err)
          }
        })
      }
    })
    .catch((err) => console.log(err))
})

module.exports = router