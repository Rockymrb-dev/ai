const { spawn } = require('child_process');
const express = require('express');
const localtunnel = require('localtunnel');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, 'ariang'))); // Static files from AriaNg

// Start aria2c
const aria2 = spawn('aria2c', ['--conf-path=aria2.conf']);
aria2.stdout.on('data', data => console.log(`aria2: ${data}`));
aria2.stderr.on('data', data => console.error(`aria2 error: ${data}`));

// Start web server
app.listen(PORT, async () => {
  console.log(`AriaNg UI running on port ${PORT}`);
  
  // Start LocalTunnel
  const tunnel = await localtunnel({ port: PORT, subdomain: 'aria2-yourname' });
  console.log(`LocalTunnel URL: ${tunnel.url}`);
});
