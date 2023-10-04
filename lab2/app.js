const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.get('/foo', (req, res) => {
  res.status(200).send('bar');
});

app.post('/hello', (req, res) => {
  const jsonData = req.body;

  if (jsonData && jsonData.name) {
    res.status(200).send(`Hello ${jsonData.name}!`);
  } else {
    res.status(400).send('Bad Request');
  }
});

app.get('/kill', (req, res) => {
  shutdownServer();
  res.status(200).send('Server is shutting down...');
});

app.get('/configValue', (req, res) => {
    const configValue = process.env.CONFIG_VALUE || 'not set';
    res.status(200).send(configValue);
  });

app.get('/secretValue', (req, res) => {
const secretValue = process.env.SECRET_VALUE || 'not set';
res.status(200).send(secretValue);
});

app.get('/envValue', (req, res) => {
    const envValue = process.env.ENV_VALUE || 'not set';
    res.status(200).send(envValue);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server Error');
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Function to shut down the server
function shutdownServer() {
  server.close(() => {
    console.log('Server has been shut down!');
    process.exit(0);
  });
}
