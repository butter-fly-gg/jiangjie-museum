@echo off
echo 正在启动江姐故里博物馆项目...

echo.
echo 1. 启动MongoDB服务...
echo 请确保MongoDB服务已在运行，如果没有请先启动MongoDB

echo.
echo 2. 启动后端服务...
cd backend
if not exist "node_modules" (
    echo 安装后端依赖...
    npm install
)

echo 初始化数据库数据...
node seed.js

echo 启动后端开发服务器...
start cmd /k "npm run dev"

cd ..

echo.
echo 3. 启动前端服务...
if not exist "node_modules" (
    echo 安装前端依赖...
    npm install
)

echo 启动前端开发服务器...
npm run serve

echo.
echo 项目启动完成！
echo 后端服务: http://localhost:3000
echo 前端服务: http://localhost:8080
echo.
pause