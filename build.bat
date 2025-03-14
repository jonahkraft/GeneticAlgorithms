@echo off

cd "frontend"
npm "run" "build"
COPY  "%CD%\dist" "%CD%\..\backend\static"
cd "%CD%\..\backend"
docker "compose" "build"