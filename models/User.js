const db = require('../config/db');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const user = db.define('users', {
  id_user: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING,
    notNull: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  }
}, {
  hooks: {
    beforeValidate: hashPassword
  },
  timestamps: false
})

function hashPassword(user) {
  if (user.changed('password')) {
    return bcrypt.hash(user.password, 8)
      .then(pass => {
        user.password = pass
      })
      .catch(err => console.log(err))
  }
}

module.exports = user;