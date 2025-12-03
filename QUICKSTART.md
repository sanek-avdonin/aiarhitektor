# AIArchitektor - Quick Start Guide

## ⚡ Get Started in 3 Minutes

Welcome to AIArchitektor! This quick start guide will get you up and running in minutes.

---

## 🚀 Installation

### Windows Users (Easiest Way)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sanek-avdonin/aiarhitektor.git
   cd aiarhitektor
   ```

2. **Run the automatic installer:**
   - Right-click `install.bat`
   - Select "Run as administrator"
   - Follow the prompts (about 2-3 minutes)

3. **Done!** Access the app at http://localhost:3001

### macOS & Linux Users

1. **Clone and navigate:**
   ```bash
   git clone https://github.com/sanek-avdonin/aiarhitektor.git
   cd aiarhitektor
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys if needed
   ```

3. **Start services:**
   ```bash
   docker-compose up -d
   ```

4. **Access at:** http://localhost:3001

---

## 🔑 First Time Setup

### Step 1: Configure AI Models (Optional)
You can start with built-in Ollama or add your preferred AI model:

**Choose one or more:**
- **OpenAI (GPT-4)** - Best for advanced tasks
- **Anthropic (Claude)** - Great for writing
- **Google (Gemini)** - Good for research
- **Local (Ollama)** - Free, no API key needed

### Step 2: Create Your First Task
1. Click "New Task" in the Task Manager
2. Give it a name
3. Select an AI model
4. Submit

### Step 3: Start a Conversation
1. Type your message or prompt
2. Press Enter or click Send
3. The AI will respond using your selected model

---

## 📋 Key Features

### Task Manager
- Create and organize tasks
- Track progress with status updates
- Set deadlines and priorities

### Calendar Integration
- Visual task scheduling
- Automatic reminders
- Timeline view of all tasks

### Multi-AI Support
- Switch between different AI models
- Compare responses
- Use specialized models for different tasks

---

## 🎯 Common Tasks

### Add an API Key
1. Go to Settings → AI Models
2. Select the model you want to configure
3. Paste your API key
4. Click Save & Test

### Create a Project
1. Click "Projects" in the sidebar
2. Click "New Project"
3. Enter project name and description
4. Add team members if needed

### Schedule a Task
1. In Task Manager, click on a task
2. Click "Set Schedule"
3. Choose date, time, and recurrence
4. Task appears on calendar

---

## 🆘 Troubleshooting

### "Port 3001 is already in use"
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3001 | xargs kill -9
```

### "Docker containers won't start"
```bash
# Check if Docker Desktop is running
docker ps

# Check container logs
docker-compose logs

# Restart containers
docker-compose down
docker-compose up -d
```

### "Can't connect to AI model"
1. Verify your API key is correct
2. Check your internet connection
3. Review the error message in Settings

---

## 📚 Learn More

- **Full Installation Guide:** See [INSTALLATION.md](INSTALLATION.md)
- **Windows Setup Details:** See [SETUP-WINDOWS.md](SETUP-WINDOWS.md)
- **Project Documentation:** See [README.md](README.md)
- **Security Information:** See [SECURITY.md](SECURITY.md)

---

## ✨ Next Steps

1. **Configure your first AI model**
   - Add OpenAI, Claude, or another service key
   - Test the connection

2. **Create a demo project**
   - Set up a simple project
   - Add a few sample tasks
   - Explore the calendar

3. **Customize settings**
   - Set your timezone
   - Configure notifications
   - Adjust theme and appearance

4. **Invite team members** (optional)
   - Share project access
   - Collaborate on tasks

---

## 🆘 Need Help?

- **GitHub Issues:** https://github.com/sanek-avdonin/aiarhitektor/issues
- **Documentation:** See README.md and other .md files
- **Security Issues:** sanek.avdonin@example.com

---

## 📝 Tips & Tricks

✅ **Pro Tips:**
- Use task templates to speed up creation
- Set up recurring tasks for regular work
- Use the calendar for better time management
- Try different AI models to find what works best
- Check logs if something isn't working

---

**Enjoy using AIArchitektor! 🎉**
