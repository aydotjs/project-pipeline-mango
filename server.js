function createApp() {
  const app = express();

  // ✅ Route FIRST — checks maintenance mode before serving anything
  app.get('/', (req, res) => {
    const config = getConfig();
    console.log('🔍 Current config on request:', config);
    
    if (config.maintenance_mode) {
      return res.sendFile(path.join(__dirname, 'public', 'maintenance.html'));
    }

    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  // ✅ Static files AFTER — for CSS, JS, images etc
  app.use(express.static('public'));

  return app;
}