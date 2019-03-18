(function (){
  var express = require('express');
  var path = require('path');
  var bodyParser = require('body-parser');
  var ejs = require('ejs');

  var routers = require('./routers.js');

  var app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.engine('.html', ejs.__express);
  app.set('view engine', 'html');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(express.static(path.join(__dirname, 'public')));

  //时间组件默认设置
  app.locals.moment = require('moment');
  routers(app);

  module.exports = app;
}).call(this);