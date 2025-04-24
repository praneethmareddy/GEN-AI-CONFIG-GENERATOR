```markdown
# Backend Server Setup Guide

## Requirements
- Python 3.x
- Ollama (for local LLM)
- pip package manager

## Setup Instructions

1. **Install Dependencies**  
```bash
cd Backend
pip install -r requirements.txt
```

2. **Download LLM Models** (Choose one)  
```bash
ollama pull llam3
# OR
ollama pull deepseek-r1
```

## Running the Server

### Standard Execution
- **Remote LLM (Samsung-GAP):**
```bash
python3 app.py
```

- **Local LLM Configuration:**
```bash
python3 app_local.py
```

### Special Case (Server IP: 70.1.1.109)
```bash
cd praneeth/rag
# For remote LLM
python3 app.py

# For local LLM
python3 app_local.py
```

## Important Notes
- Keep Ollama service running for local LLM operations
- Ensure firewall allows port access for remote connections
- Verify model downloads with `ollama list` before starting local LLM
```

Simply copy this entire content into a `README.md` file.
