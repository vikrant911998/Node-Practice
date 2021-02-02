const express = require('express');
const bodyParser = require('body-parser');
const server = express();

const sequelize = require('./utils/db');
const authRoutes = require('./routes/auth');

server.use(bodyParser.urlencoded({ extended: false}));
server.use(bodyParser.json());

server.use('/auth',authRoutes);

sequelize.sync()
  .then((success)=>{
    console.log('success in db connection.');
    server.listen(3004,()=>console.log('server started.'));
  })
  .catch((err)=>{
    console.log('error in db connection.', err);
  });
