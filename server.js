require('dotenv').config();
const express = require('express');
const path = require('path');

function createApp() {
  const app = express();
  
  // Serve static files from public directory
  app.use(express.static('public'));
  
  // Route for home page
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  return app;
}

// Only start the server if this file is run directly (not imported by tests)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  const NODE_ENV = process.env.NODE_ENV || 'development';
  const APP_NAME = process.env.APP_NAME || 'Sour-Mango';
  
  const app = createApp();
  
  app.listen(PORT, () => {
    if (NODE_ENV === 'production') {
      console.log(`🚀 ${APP_NAME} Production Server running on http://localhost:${PORT}`);
    } else {
      console.log(`🔧 ${APP_NAME} Development Server running on http://localhost:${PORT}`);
      console.log(`📝 Debug mode enabled`);
      console.log(`🌍 Environment: ${NODE_ENV}`);
    }
  });
}

// Export both the app instance AND the createApp function
const app = createApp();
module.exports = app;              // Default export (for smoke tests)
module.exports.createApp = createApp;  // Named export (for unit tests)