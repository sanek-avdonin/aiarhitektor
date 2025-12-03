# Installation Guide - AIArchitektor

## Complete Installation Instructions for Windows, macOS, and Linux

This guide provides step-by-step instructions for installing and running AIArchitektor on your system.

---

## System Requirements

Before starting, ensure your system meets these requirements:

### Minimum Requirements
- **OS**: Windows 10/11, macOS 10.14+, or Linux (Ubuntu 18.04+)
- **RAM**: 8GB minimum (16GB recommended)
- **Disk Space**: 20GB available
- **Internet**: Stable connection for downloading dependencies

### Required Software
- **Git**: For cloning the repository
- **Node.js**: v16.0 or higher (LTS recommended)
- **Docker**: For running containerized services
- **Docker Compose**: v2.0 or higher

---

## Windows Installation

### Option 1: Automated Installation (Recommended)

The fastest and easiest way to get started:

1. **Download the repository:**
   ```bash
   git clone https://github.com/sanek-avdonin/aiarhitektor.git
   cd aiarhitektor
   ```

2. **Run the automated installer:**
   - Right-click on `install.bat`
   - Select "Run as administrator"
   - Follow the on-screen prompts

3. **Wait for completion:**
   - The script will:
     - Verify system requirements
     - Clone the repository
     - Configure environment variables
     - Start Docker containers
     - Display service URLs

### Option 2: Manual Installation

For more control or troubleshooting:

1. **Install prerequisites:**
   - [Git for Windows](https://git-scm.com/download/win)
   - [Node.js LTS](https://nodejs.org/)
   - [Docker Desktop](https://www.docker.com/products/docker-desktop)

2. **Clone the repository:**
   ```bash
   git clone https://github.com/sanek-avdonin/aiarhitektor.git
   cd aiarhitektor
   ```

3. **Configure environment:**
   ```bash
   copy .env.example .env
   # Edit .env with your API keys
   ```

4. **Start services:**
   ```bash
   docker-compose up -d
   ```

5. **Access the application:**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000
   - Admin Panel: http://localhost:3001/admin

---

## macOS Installation

### Prerequisites

1. **Install Homebrew (if not already installed):**
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Install dependencies via Homebrew:**
   ```bash
   brew install git node docker
   ```

3. **Install Docker Desktop:**
   ```bash
   brew install --cask docker
   # Then launch Docker from Applications folder
   ```

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sanek-avdonin/aiarhitektor.git
   cd aiarhitektor
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   nano .env
   ```

3. **Start services:**
   ```bash
   docker-compose up -d
   ```

4. **Verify installation:**
   ```bash
   docker-compose ps
   # Should show all containers running
   ```

---

## Linux Installation (Ubuntu/Debian)

### Prerequisites

1. **Update system packages:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Install dependencies:**
   ```bash
   sudo apt install -y git curl
   ```

3. **Install Node.js (via NodeSource):**
   ```bash
   curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

4. **Install Docker:**
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   ```

5. **Add user to docker group:**
   ```bash
   sudo usermod -aG docker $USER
   # Logout and login for changes to take effect
   ```

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sanek-avdonin/aiarhitektor.git
   cd aiarhitektor
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   nano .env
   # Add your AI model API keys
   ```

3. **Start services:**
   ```bash
   docker-compose up -d
   ```

4. **Check logs:**
   ```bash
   docker-compose logs -f
   ```

---

## Configuring API Keys

### Supported AI Models

AIArchitektor supports multiple AI providers:

1. **OpenAI (GPT-4, GPT-3.5)**
   - Get API key: https://platform.openai.com/api-keys
   - Add to .env: `OPENAI_API_KEY=your_key_here`

2. **Anthropic (Claude)**
   - Get API key: https://console.anthropic.com/
   - Add to .env: `ANTHROPIC_API_KEY=your_key_here`

3. **Google (Gemini)**
   - Get API key: https://makersuite.google.com/app/apikey
   - Add to .env: `GOOGLE_API_KEY=your_key_here`

4. **Local Models (Ollama)**
   - Download: https://ollama.ai
   - Models: LLaMA, Mistral, etc.
   - No API key required

### .env Configuration Example

```bash
# Database
DATABASE_URL=postgresql://user:password@db:5432/aiarhitektor

# AI Models
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=AIza...

# Optional Services
REDIS_URL=redis://redis:6379

# Application
NODE_ENV=production
PORT=3000
```

---

## Troubleshooting

### Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Windows: Find and kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux: Find and kill process
lsof -ti:3000 | xargs kill -9
```

### Docker Not Running

**Error:** `Cannot connect to Docker daemon`

**Solution:**
- Windows: Start Docker Desktop from Start Menu
- macOS: Start Docker from Applications folder
- Linux: `sudo systemctl start docker`

### Insufficient Memory

**Error:** `Cannot allocate memory`

**Solution:**
- Close other applications
- Increase Docker memory limit in Docker Desktop Settings
- Minimum 4GB allocated to Docker

### Database Connection Issues

**Error:** `ECONNREFUSED 127.0.0.1:5432`

**Solution:**
```bash
# Check if PostgreSQL container is running
docker-compose ps

# View database logs
docker-compose logs db

# Restart database
docker-compose restart db
```

---

## Verifying Installation

### Step 1: Check Container Status
```bash
docker-compose ps
```
All containers should show `Up` status.

### Step 2: Access the Application
- Open http://localhost:3001 in your browser
- You should see the AIArchitektor login page

### Step 3: Test AI Models
- Configure at least one AI model in settings
- Send a test message to verify connectivity

### Step 4: Check Logs
```bash
docker-compose logs backend
```
Logs should show "Server running on port 3000"

---

## Post-Installation Setup

### 1. Configure Task Manager
- Access Admin Panel: http://localhost:3001/admin
- Create your first project
- Set up task templates

### 2. Set Up Calendar
- Configure calendar settings
- Import existing tasks if needed
- Set notification preferences

### 3. Connect AI Models
- Add API keys for desired providers
- Test each model connection
- Set default model for tasks

---

## Updating to Latest Version

```bash
# Navigate to project directory
cd aiarhitektor

# Pull latest changes
git pull origin main

# Restart containers
docker-compose down
docker-compose up -d
```

---

## Getting Help

- **Documentation**: See [README.md](README.md) and [SETUP-WINDOWS.md](SETUP-WINDOWS.md)
- **Issues**: Report bugs at https://github.com/sanek-avdonin/aiarhitektor/issues
- **Security**: Report vulnerabilities at sanek.avdonin@example.com

---

Last Updated: 2024
