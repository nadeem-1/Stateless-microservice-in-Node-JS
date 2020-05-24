var express = require('express');
    jwt = require('jsonwebtoken'),
    morgan = require('morgan'),
    dotenv = require('dotenv'),
    pino = require('pino')(),
    config = require('./config/key'),
    port = process.env.PORT || 3000,
    app = express();
const middlewares = require('./middlewares/middleware');
app.use('./assets', express.static('assets'));
app.set('view engine', 'ejs');
app.use(morgan('dev'));

app.listen(3000,function(){
  pino.info('Server Started');
});

app.get('/api/login',(req,res)=>{
  const user={
    id:1,
    username:'sourav',
    password:'1234'
  };
  var token=jwt.sign({user},config.secret_Key);
  pino.info(token);
  middlewares.localStorage.setItem("jwtoken",token);
  console.log(middlewares.localStorage.length);
  res.json(token);
});
  app.get('/api/image',middlewares.validity,middlewares.ThumbnailCreation,(req,res)=>{
  	res.send("Successfully downloaded and thumbnail created");
  });

module.exports.app=app;
module.exports.port=port;
