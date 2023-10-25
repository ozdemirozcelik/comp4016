const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.get('/isAlive', (req, res) => {
  res.status(200).send('yes');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server Error');
});

const server = app.listen(port, () => {
  console.log(`Probe Server is running on port ${port}`);
});
