const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

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

app.post('/saveString', (req, res) => {
  const savedString = req.body.string;

  // Save the string to the ConfigMap volume
  fs.writeFileSync('/config/STRING_VALUE', savedString);

  res.status(200).send('String saved successfully');
});

app.get('/getString', (req, res) => {
  try {
    // Read the saved string from the ConfigMap volume
    const savedString = fs.readFileSync('/config/STRING_VALUE', 'utf8');
    res.status(200).send(savedString);
  } catch (error) {
    res.status(404).send('404 Not Found');
  }
});

app.get('/busywait', async (req, res) => {
  const busyDuration = 3 * 60 * 1000; // 3 minutes in milliseconds
  const statusUpdateInterval = 10000; // Send status updates every 10 seconds
  const startTime = Date.now();
  let elapsedTime = 0;

  const sendProgress = () => {
    elapsedTime = Date.now() - startTime;
    const remainingSeconds = Math.max(0, (busyDuration - elapsedTime) / 1000); // Calculate remaining seconds
    res.write(`Using CPU, remaining seconds: ${remainingSeconds.toFixed(0)}\n`);

    if (remainingSeconds > 0) {
      setTimeout(sendProgress, statusUpdateInterval); // Schedule next status update
    } else {
      res.write('CPU usage completed.\n');
      res.end();
    }
  };

  // Send a starting message
  res.write('Starting CPU usage...\n');

  // Start sending progress updates every 10 seconds
  setTimeout(sendProgress, statusUpdateInterval);

  // Perform a CPU-bound operation (mathematical calculations)
  const performCPUBoundOperation = () => {
    for (let i = 0; i < 100000; i++) {
      // Perform some mathematical calculations
      Math.sqrt(i) * Math.sin(i);
    }

    elapsedTime = Date.now() - startTime;

    if (elapsedTime < busyDuration) {
      setImmediate(performCPUBoundOperation); // Continue CPU-bound operation
    }
  };

  performCPUBoundOperation();
});

