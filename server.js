require('dotenv').config();
const express = require('express');
const path = require('path');
const { refreshConfig, getConfig } = require('./appconfig'); // 1. import

function createApp() {
  const app = express();
  app.use(express.static('public'));

  app.get('/', (req, res) => {
    const config = getConfig(); // 2. read config on every request

    if (config.maintenance_mode) {
      // 3. serve maintenance page instead
      return res.sendFile(path.join(__dirname, 'public', 'maintenance.html'));
    }

    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  return app;
}

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  const app = createApp();

  // fetch config once at startup, then poll every 30s
  refreshConfig().then(() => {
    setInterval(refreshConfig, 30_000);
    app.listen(PORT, () => console.log(`🚀 Running on port ${PORT}`));
  });
}

const app = createApp();
module.exports = app;
module.exports.createApp = createApp;