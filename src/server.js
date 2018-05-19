const express = require('express');
const morgan = require('morgan');
const request = require('request');
const parseString = require('xml2js').parseString;

const app = express();

app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/bbc', (req, res) => {
  request('https://feeds.bbci.co.uk/news/rss.xml', (error, response, body) => {
    if (error) return res.send(error);
    return parseString(body, (err, result) => res.send(result));
  });
});

app.listen(3001, () => console.log('We are listening on port', 3001));
