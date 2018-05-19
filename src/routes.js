const express = require('express');
const request = require('request');
const { parseString } = require('xml2js');

const router = express.Router();

router.get('/bbc', (req, res) => {
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

module.exports = router;
