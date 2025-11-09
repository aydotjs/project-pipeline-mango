#!/bin/bash
echo "📦 Installing Node.js dependencies..."

cd /home/ec2-user/sour-mango

# Install production dependencies only
npm install --production

echo "✅ Dependencies installed"