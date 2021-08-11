const express = require('express');

const app = express();
const path = require('path');
const compression = require('compression');
const favicon = require('serve-favicon');
const axios = require('axios');

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

const API_KEY = {
  headers: {
    'x-rapidapi-key': '469c1ee794msh8a7c6f3db2abd58p1e322ejsn1ead0ede256f',
    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
  },
};
app.get('/popImages', (req, res) => {
  axios.request('https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=alphabetical', API_KEY)
    .then((response) => response)
    .then((response) => res.send([
      response.data[0],
      response.data[1],
      response.data[2],
      response.data[3],
    ]))
    .catch((err) => res.send(err.message));
});

app.listen(app.get('port'), () => {
  console.log('App Running On Port', app.get('port'));
});