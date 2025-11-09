#!/bin/bash
echo "🚀 Starting Sour Mango application..."

cd /home/ec2-user/sour-mango

# Start the application with PM2
pm2 start server.js --name sour-mango

# Save PM2 process list (survives reboots)
pm2 save

# Setup PM2 to start on system boot
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ec2-user --hp /home/ec2-user

echo "✅ Sour Mango is now running!"