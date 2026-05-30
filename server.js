require('dotenv').config();
const express = require('express');
const path = require('path');
const { refreshConfig, getConfig } = require('./appconfig');

const app = express();

app.get('/', (req, res) => {
  const config = getConfig();
  console.log('🔍 Config on request:', config);

  if (config.maintenance_mode) {
    return res.sendFile(path.join(__dirname, 'public', 'maintenance.html'));
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.static('public'));

const PORT = process.env.PORT || 8080;

refreshConfig().then(() => {
  setInterval(refreshConfig, 30_000);
  app.listen(PORT, () => console.log(`🚀 Running on port ${PORT}`));
}).catch(err => {
  console.error('Failed to start:', err);
  process.exit(1);
});

module.exports = app;