#!/bin/bash
echo "🔍 Validating Sour Mango application..."

# Give the app a few seconds to fully start
sleep 5

# Check if the app responds on localhost:3000
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)

if [ "$HTTP_CODE" -eq 200 ]; then
    echo "✅ SUCCESS! Sour Mango is serving sweet success! HTTP $HTTP_CODE"
    exit 0
else
    echo "❌ FAILED! Sour Mango tastes bitter... HTTP $HTTP_CODE"
    exit 1
fi