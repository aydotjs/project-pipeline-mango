#!/bin/bash
echo "🛑 Stopping Sour Mango application..."

# Stop the PM2 process
pm2 stop sour-mango || true

# Delete the PM2 process
pm2 delete sour-mango || true

echo "✅ Application stopped successfully"