const Sequelize = require('sequelize')

const sequelize = new Sequelize('medsos', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log
})

module.exports = sequelize;