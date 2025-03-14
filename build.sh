#!/bin/sh
cd frontend
npm run build
cp -r ./dist ../backend/static
cd ../backend
docker compose build