/* eslint-disable no-console */
const express = require('express');
const axios = require('axios');

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

const API_KEY = {
  headers: {
    'x-rapidapi-key': '469c1ee794msh8a7c6f3db2abd58p1e322ejsn1ead0ede256f',
    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
  },
};
app.get('/popImages', (req, res) => {
  axios.request('https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=popularity', API_KEY)
    .then((response) => response)
    .then((response) => res.send([
      response.data[0],
      response.data[1],
      response.data[2],
      response.data[3],
    ]))
    .catch((err) => res.send(err.message));
});
app.get('/game-list', (req, res) => {
  axios.request('https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=popularity', API_KEY)
    .then((response) => response)
    .then((response) => response.data.slice(4))
    .then((response) => res.send(response))
    .catch((err) => res.send(err.message));
});
const generateOption = (params) => ({
  params,
  headers: {
    'x-rapidapi-key': '469c1ee794msh8a7c6f3db2abd58p1e322ejsn1ead0ede256f',
    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
  },
});

app.get('/filterGame/:label/:option', (req, res) => {
  const labelValue = req.params.label;
  const { option } = req.params;
  const params = {};
  params[labelValue] = option;
  axios.request(`https://free-to-play-games-database.p.rapidapi.com/api/games?${labelValue}=${option}`, generateOption(params))
    .then((response) => res.json(response.data))
    .catch((err) => res.send(err.message));
});
app.get('/game/:id', (req, res) => {
  const { id } = req.params;
  axios.request(`https://www.freetogame.com/api/game?id=${id}`, API_KEY)
    .then((response) => res.json(response.data))
    .catch((err) => res.send(err.message));
});

app.use(error404);
app.use(error500);

app.listen(app.get('port'), () => {
  console.log('App Running On Port', app.get('port'));
});
