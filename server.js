require('dotenv').config();
const express = require('express');
const path = require('path');
const { refreshConfig, getConfig } = require('./appconfig');

function createApp() {
  const app = express();
  app.use(express.static('public'));

  app.get('/', (req, res) => {
    const config = getConfig();
    console.log('🔍 Current config on request:', config); // ← add this line
    
    if (config.maintenance_mode) {
      return res.sendFile(path.join(__dirname, 'public', 'maintenance.html'));
    }

    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  return app;
}

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  const app = createApp();

  refreshConfig().then(() => {
    setInterval(refreshConfig, 30_000);
    app.listen(PORT, () => console.log(`🚀 Running on port ${PORT}`));
  });
}

const app = createApp();
module.exports = app;
module.exports.createApp = createApp;