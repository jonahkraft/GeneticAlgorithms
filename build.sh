#!/bin/sh
cd frontend
npm install
npm run build
cp -r ./dist ../backend/static
cd ../backend
docker compose build