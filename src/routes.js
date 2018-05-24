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
            source: 'BBC',
            title: el.title[0],
            description: el.description[0],
            link: el.link[0],
            thumbnail: el['media:thumbnail'][0].$.url,
          },
        ),
      );
      res.json(massaged);
    });
  });
});

router.get('/npr', (req, res) => {
  request('http://www.npr.org/rss/rss.php?id=1001', (error, response, body) => {
    if (error) return res.send(error);
    return parseString(body, (err, result) => {
      const massaged = result.rss.channel[0].item.map(el =>
        // console.log(el['media:content']);
        Object.assign(
          {},
          {
            source: 'NPR',
            title: el.title[0],
            description: el.description[0],
            link: el.link[0],
          },
        ),
      );
      res.json(massaged);
    });
  });
});

router.get('/cnn', (req, res) => {
  request(
    'http://rss.cnn.com/rss/cnn_topstories.rss',
    (error, response, body) => {
      if (error) return res.send(error);
      return parseString(body, (err, result) => {
        const massaged = result.rss.channel[0].item.map(el =>
          Object.assign(
            {},
            {
              source: 'CNN',
              title: el.title[0],
              description: el.description[0].split('<div')[0],
              link: el.link[0],
              thumbnail: el['media:group']
                ? el['media:group'][0]['media:content'][8].$.url
                : null,
            },
          ),
        );
        res.json(massaged);
      });
    },
  );
});

module.exports = router;
