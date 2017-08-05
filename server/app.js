const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');

const { analyzeSentiment } = require('./watsonHelpers');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public/dist')));

app.get('/watson', (req, res) => {
  const sampleParams = {
    url: 'www.ibm.com',
    features: {
      keywords: {
        sentiment: true,
        emotion: true,
        limit: 3,
      },
    },
  };

  analyzeSentiment(sampleParams)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    console.log(err);
  });
});

app.post('/', (req, res) => {
  res.status(201).send(req.body);
});

app.get('*', (req, res) => {
  res.status(404).send('Not found');
});


module.exports = app;
