/* eslint-disable no-console */
const express = require('express');

const app = express();
const path = require('path');
const compression = require('compression');
const favicon = require('serve-favicon');
const error404 = require('./handle404');
const error500 = require('./handle500');

app.disabled('x-powered-by');
app.set('port', process.env.PORT || 4000);
app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'public/favicon.ico')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use(error404);
app.use(error500);

app.listen(app.get('port'), () => {
  console.log('App Running On Port', app.get('port'));
});
