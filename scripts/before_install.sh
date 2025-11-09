#!/bin/bash
echo "🧹 Cleaning up old deployment..."

# Remove old application directory
sudo rm -rf /home/ec2-user/sour-mango

# Create fresh directory
sudo mkdir -p /home/ec2-user/sour-mango

# Set proper ownership
sudo chown -R ec2-user:ec2-user /home/ec2-user/sour-mango

echo "✅ Cleanup complete"