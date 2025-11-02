// server.js
const express = require('express');
const path = require('path');

// Export a function that creates the app
function createApp() {
  const app = express();
  
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
  return app;
}

// Only start the server if this file is run directly (not imported by tests)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  const app = createApp();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

// Export for testing
module.exports = { createApp };