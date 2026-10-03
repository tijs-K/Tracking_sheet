# 📊 Tracking Sheet

<div align="center">

A modern, minimalist job application and interview tracking dashboard built with **Angular 22**, **FastAPI (Python)**, **Tailwind CSS v4**, and **Docker**.

[![Status](https://img.shields.io/badge/Status-In_Active_Development-amber?style=for-the-badge)](https://github.com)
[![Angular](https://img.shields.io/badge/Angular-22-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
[![Python](https://img.shields.io/badge/Python-3.12+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://sqlite.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

</div>

> [!NOTE]
> 🚧 **Work in Progress**: This is an ongoing personal project under active development. Features, database persistence, and UI improvements are continuously being added and refined.

---

## 🌟 Highlights

- 📈 **Executive Metrics Dashboard** — Real-time dynamic counts of Total Applications, Interviews, Offers, and Rejections.
- 📋 **Application Pipeline** — Responsive table with live search, company/position filters, and color-coded status badges (`Applied`, `Interview`, `Offer`, `Rejected`).
- 🌙 **Dark / Light / System Mode** — Complete theme customization powered by Tailwind v4 and persisted via `ThemeService`.
- ⚡ **Angular 22 & SSR** — Modern standalone component architecture with Angular Signals and Server-Side Rendering (SSR).
- 🐍 **FastAPI Python Backend** — Lightweight, high-performance REST API with automatic Swagger UI documentation.
- 🗄️ **SQLAlchemy & SQLite** — Local database persistence that is completely git-ignored to protect your personal tracking data.
- 🐳 **Docker Autostart** — Configured with Docker Compose (`restart: unless-stopped`) for seamless background running.

---

## 🚀 Getting Started: Running Both Programs Together

Tracking Sheet is a full-stack application composed of two separate services running simultaneously:

1. **Frontend (Angular)** on `http://localhost:4200`
2. **Backend (Python / FastAPI)** on `http://localhost:8000`

You can run both services together using **Docker Compose** (recommended) or locally using **two terminal windows**.

---

### Option A: Run Both with Docker (Recommended)

Start both the frontend and backend with a single command from the project root:

```bash
docker compose up -d --build
```

- **Angular Frontend**: [http://localhost:4200](http://localhost:4200)
- **Python Backend**: [http://localhost:8000/api/applications](http://localhost:8000/api/applications)
- **Interactive Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

#### Useful Docker Commands

```bash
# Follow logs for both services in real time
docker compose logs -f

# Follow logs for a specific service
docker compose logs -f tracking-sheet   # Frontend
docker compose logs -f backend          # Backend

# Stop both containers
docker compose down
```

Both containers are configured with live volume mounts, so code changes will automatically hot-reload in real time.

---

### Option B: Run Manually (Local Development with Two Terminals)

If you prefer running without Docker, follow the instructions below using two separate terminal windows.

#### Terminal 1: Start the Backend (Python)

The backend manages the database and serves the REST API.

1. **Navigate into the backend directory**:

   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment**:

   ```bash
   # Create isolated environment
   python3 -m venv .venv

   # Activate it (Linux/macOS)
   source .venv/bin/activate

   # Activate it (Windows PowerShell)
   # .venv\Scripts\Activate.ps1
   ```

3. **Install Python dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

4. **Start the FastAPI development server**:

   ```bash
   uvicorn main:app --reload
   ```

5. **Verify the backend is live**:
   - **Root API**: [http://localhost:8000/api/applications](http://localhost:8000/api/applications)
   - **Interactive Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs) (test your endpoints directly in the browser!)

---

#### Terminal 2: Start the Frontend (Angular)

Open a **new, separate terminal window** in the project root:

1. **Install Node dependencies**:

   ```bash
   npm install
   ```

2. **Start the development server**:

   ```bash
   npm start
   ```

---

### 🌐 Accessing the Full-Stack Application

Once running (via Docker or manual terminals):

| Service              | Address                                                  | Description                       |
| :------------------- | :------------------------------------------------------- | :-------------------------------- |
| **Angular Frontend** | [http://localhost:4200](http://localhost:4200)           | Main UI dashboard & tracking app  |
| **Python Backend**   | [http://localhost:8000](http://localhost:8000)           | REST API server                   |
| **Swagger UI Docs**  | [http://localhost:8000/docs](http://localhost:8000/docs) | Interactive API testing interface |

Both the frontend and backend support **hot-reloading** — any code changes you save will automatically refresh in real time.

---

## 🔌 API Endpoints Reference

The FastAPI service exposes the following REST endpoints:

| Method | Endpoint                 | Description                                 |
| :----- | :----------------------- | :------------------------------------------ |
| `GET`  | `/api/applications`      | Retrieve all applications from the database |
| `GET`  | `/api/applications/{id}` | Retrieve details for a specific application |
| `POST` | `/api/applications`      | Create a new application record             |
| `PUT`  | `/api/applications/{id}` | Update application status or details        |

---

## 📂 Project Structure

```text
Tracking_sheet/
├── src/                        # Angular 22 Frontend
│   ├── app/
│   │   ├── layout/
│   │   │   ├── header/         # Global header & responsive nav
│   │   │   └── tile/           # Reusable metric card tile
│   │   ├── pages/
│   │   │   ├── dashboard/      # Metrics & recent applications table
│   │   │   ├── applications/   # Searchable application list & filters
│   │   │   ├── add-application/# New application creation form
│   │   │   ├── specific-application/ # Detailed application view
│   │   │   └── settings/       # Theme & pipeline configuration
│   │   ├── services/
│   │   │   ├── applicationService.ts # Frontend data management
│   │   │   └── themeService.ts       # Light/Dark/System theme switcher
│   │   ├── app.routes.ts       # Route configurations
│   │   └── app.ts              # Root application component
│   └── styles.css              # Tailwind v4 configuration & dark styles
├── backend/                    # Python / FastAPI Backend
│   ├── main.py                 # FastAPI app, CORS, and REST routes
│   ├── models.py               # SQLAlchemy database models
│   ├── database.py             # SQLite connection & session management
│   ├── schemas.py              # Pydantic request & validation models
│   ├── requirements.txt        # Python package dependencies
│   ├── Dockerfile              # Backend Dockerfile with live sync
│   └── applications.db         # Local SQLite database (git-ignored)
├── compose.yaml                # Docker Compose definition (both frontend & backend)
├── Dockerfile                  # Frontend Dockerfile with live sync
└── .gitignore                  # Git ignore rules (.venv, *.db, node_modules)
```

---

## 🛡️ Privacy & Database Safety

- **Git-Ignored Database**: The SQLite file (`applications.db`) and Python virtual environments (`.venv/`) are configured in `.gitignore`. Your personal application data will **never** be committed or exposed to GitHub.
- **Production Ready**: Because the database layer is built using **SQLAlchemy**, switching from local SQLite to a hosted cloud **PostgreSQL** database (e.g. Neon, Supabase, Render) requires changing only the `DATABASE_URL` environment variable — no code changes needed.

---

## 🛠️ Useful Frontend Scripts

| Command                | Description                                              |
| :--------------------- | :------------------------------------------------------- |
| `npm start`            | Starts the Angular dev server on `localhost:4200`        |
| `npm run build`        | Builds client & SSR server production bundles in `dist/` |
| `npm test`             | Runs the Vitest test suite (`10/10` suites passing)      |
| `npm run format`       | Formats all code with Prettier                           |
| `npm run format:check` | Verifies Prettier compliance                             |
