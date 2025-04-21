#!/bin/bash
# This script starts the application in static mode without a backend

echo "Starting VivahLens in static mode (frontend only)..."
echo "Using local JSON data instead of API backend"

# Use Vite's development server directly with our client code
cd client
npx vite --port 3000 --host 0.0.0.0