@echo off
REM AIArchitektor Windows Installation Script
REM This script automates the setup of AIArchitektor on Windows
REM Requirements: Administrator privileges

setlocal enabledelayedexpansion

echo.
echo ============================================
echo AIArchitektor Installation Script for Windows
echo ============================================
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Error: This script must be run as Administrator!
    echo Please right-click on cmd.exe and select "Run as administrator"
    pause
    exit /b 1
)

echo [1/5] Checking system requirements...
echo.

REM Check if Git is installed
git --version >nul 2>&1
if %errorLevel% neq 0 (
    echo Git is not installed. Installing Git...
    start https://git-scm.com/download/win
    echo Please download and install Git, then run this script again.
    pause
    exit /b 1
)
echo [OK] Git is installed

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorLevel% neq 0 (
    echo Node.js is not installed. Installing Node.js...
    start https://nodejs.org/
    echo Please download and install Node.js (LTS version), then run this script again.
    pause
    exit /b 1
)
echo [OK] Node.js is installed

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorLevel% neq 0 (
    echo Docker is not installed. Installing Docker Desktop...
    start https://www.docker.com/products/docker-desktop
    echo Please download and install Docker Desktop, then run this script again.
    echo Note: Docker Desktop requires Windows 10 Pro/Enterprise or Windows 11.
    pause
    exit /b 1
)
echo [OK] Docker is installed

echo.
echo [2/5] Cloning repository...
REM Check if aiarhitektor directory already exists
if exist "aiarhitektor" (
    echo Directory 'aiarhitektor' already exists.
    set /p OVERWRITE="Do you want to update it? (y/n): "
    if /i "!OVERWRITE!"=="y" (
        cd aiarhitektor
        git pull origin main
        cd ..
    )
) else (
    git clone https://github.com/sanek-avdonin/aiarhitektor.git
    if %errorLevel% neq 0 (
        echo Error: Failed to clone repository
        pause
        exit /b 1
    )
)
echo [OK] Repository ready

echo.
echo [3/5] Configuring environment...
cd aiarhitektor

if not exist ".env" (
    copy .env.example .env
    echo [OK] Created .env file from template
    echo Please edit .env file with your API keys:
    echo - OPENAI_API_KEY (for GPT-4)
    echo - ANTHROPIC_API_KEY (for Claude)
    echo - GOOGLE_API_KEY (for Gemini)
    echo - Other AI model keys as needed
    pause
) else (
    echo [OK] .env file already exists
)

echo.
echo [4/5] Starting Docker containers...
REM Check if Docker daemon is running
docker info >nul 2>&1
if %errorLevel% neq 0 (
    echo Docker is not running. Please start Docker Desktop and try again.
    pause
    exit /b 1
)

echo Starting services with docker-compose...
docker-compose up -d
if %errorLevel% neq 0 (
    echo Error: Failed to start Docker containers
    echo Troubleshooting:
    echo 1. Make sure Docker Desktop is running
    echo 2. Check if ports 3000, 3001, 5432 are not in use
    echo 3. Run: docker-compose down
    pause
    exit /b 1
)
echo [OK] Docker containers started

echo.
echo [5/5] Waiting for services to be ready...
timeout /t 10 /nobreak

echo.
echo ============================================
echo Installation Complete!
echo ============================================
echo.
echo Services are now running at:
echo - Frontend: http://localhost:3001
echo - Backend API: http://localhost:3000
echo - Admin Panel: http://localhost:3001/admin
echo.
echo Next steps:
echo 1. Open http://localhost:3001 in your browser
echo 2. Configure your AI model preferences
echo 3. Start using AIArchitektor!
echo.
echo To stop services: docker-compose down
echo To view logs: docker-compose logs -f
echo.
echo For troubleshooting, see SETUP-WINDOWS.md
echo.
pause
