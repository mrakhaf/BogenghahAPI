const express = require('express')
const sequelize = require('./config/db')
const router = require('./routes/api/MainRoutes')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))

//MainRoutes
app.use('/api/v1', router)

//testing db connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


app.listen(PORT, () => console.log(`Running on localhost: ${PORT}`))