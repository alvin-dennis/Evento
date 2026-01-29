# Evento

> A modern event management platform — manage, share, and track events with ease. Supports frontend and backend workflows with strict type checking and linting for quality.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17+
- **bun** 8.0+ ([Install](https://bun.sh/installation))
- **Python** 3.11+
- **uv** (for backend dependencies)
- **FastAPI** (for backend)
- **Ruff** (Python linting)

### Setup

```bash
# Clone repository
git clone https://github.com/alvin-dennis/Evento.git
cd Evento

# --- Client setup ---
cd client
bun install
cp .env.example .env

# --- Server setup ---
cd ../server
uv install
cp .env.example .env

# Back to root for pushing the commit
cd ..
```

### Run Development Servers

```bash
# Frontend (client)
cd client
bun dev
# Open http://localhost:3000

# Backend (server) in a separate terminal
cd ../server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
# Open http://localhost:8000/docs
```

---

## 📦 Available Commands

### Client (Frontend)

```bash
cd client

# Development
bun dev

# Build for production
bun build
bun start

# Linting & formatting
bun lint          # Biome linter
bun lint:fix      # Auto-fix
bun format        # Format code
bun validate      # Run all checks

# Type checking
bun typecheck
```

### Server (Backend)

```bash
cd server

# Run FastAPI development server
uvicorn main:app --reload

# Lint with Ruff
ruff check .

# Auto-fix issues with Ruff
ruff check . --fix
```

### Full Validation

```bash
# Root folder
# Client
cd client
bun validate
bun typecheck

# Server
cd ../server
ruff check .
```

---

## ⚙️ Configuration

### Environment Variables

**Client (`client/.env`)**

```env
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Server (`server/.env`)**

```env
PYTHON_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/evento
SECRET_KEY=super-secret-key
```

---

## 👨‍💻 Development Workflow

### Quality Checks

Before committing or pushing:

```bash
# Client
cd client
bun validate
bun lint:fix
bun format
bun typecheck

# Server
cd ../server
ruff check .
```

### Git Workflow

1. Fork repository
2. Create feature branch: `git checkout -b feat/amazing-feature`
3. Make changes following code style
4. Run full validation of the respective codebase
5. Return to root for pushing the commit
6. Commit: `git commit -m "feat: add amazing feature"`
7. Push: `git push origin feat/amazing-feature`
8. Create Pull Request

---
