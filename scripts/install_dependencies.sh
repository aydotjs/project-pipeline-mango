#!/bin/bash
echo "Installing Node.js dependencies..."
cd /home/ec2-user/sour-mango

# Install PM2 globally if not already installed
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    sudo npm install -g pm2
fi

# Install production dependencies
npm install --production
echo "Dependencies installed"
