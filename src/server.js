const express = require('express');
const morgan = require('morgan');
const request = require('request');
const { parseString } = require('xml2js');

const app = express();

app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  next();
});

app.use('/bbc', (req, res) => {
  request('https://feeds.bbci.co.uk/news/rss.xml', (error, response, body) => {
    if (error) return res.send(error);
    return parseString(body, (err, result) => {
      const massaged = result.rss.channel[0].item.map(el =>
        Object.assign(
          {},
          {
            title: el.title[0],
            description: el.description[0],
            link: el.link[0],
            thumbnail: el['media:thumbnail'][0].$.url,
          },
        ),
      );
      res.send(massaged);
    });
  });
});

app.listen(3001, () => console.log('We are listening on port', 3001));
