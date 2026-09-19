# 📊 Tracking Sheet

<div align="center">

A modern, minimalist job application and interview tracking dashboard built with **Angular 22**, **Tailwind CSS v4**, and **Docker**.

[![Angular](https://img.shields.io/badge/Angular-22-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-22+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

</div>

---

## 🌟 Highlights

- 📈 **Executive Metrics Dashboard** — Instant high-level count of Total Applications, Interviews, Offers, and Rejections.
- 📋 **Application Pipeline** — Clean, responsive table showing company, position, date applied, and color-coded status badges (`Applied`, `Interview`, `Offer`).
- ⚡ **Angular 22 & SSR** — Modern standalone component architecture with built-in Server-Side Rendering (SSR) via Express.
- 🎨 **Tailwind CSS v4** — Sleek, modern styling with mobile and desktop responsive layouts.
- 🐳 **Docker Autostart** — Configured with Docker Compose (`restart: unless-stopped`) for seamless background running and automatic startup on system boot.

---

## 🚀 Quick Start

### Option A: Run with Docker (Recommended)

Docker runs the entire environment with live-reload and automatically restarts on system boot.

1. **Start the container**:
   ```bash
   docker compose up -d --build
   ```

2. **Open in browser**:
   Navigate to [http://localhost:4200](http://localhost:4200).

3. **View logs**:
   ```bash
   docker compose logs -f
   ```

4. **Stop the container**:
   ```bash
   docker compose down
   ```

---

### Option B: Run Locally (Node.js)

If you prefer running directly on your host machine:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm start
   ```

3. Open [http://localhost:4200](http://localhost:4200) in your browser. The app automatically reloads when source files change.

---

## 📂 Project Structure

```text
Tracking_sheet/
├── src/
│   ├── app/
│   │   ├── layout/
│   │   │   ├── header/         # Global header & navigation
│   │   │   └── tile/           # Reusable metric card component
│   │   ├── pages/
│   │   │   ├── dashboard/      # Main stats & recent applications
│   │   │   ├── applications/   # Full application list & management
│   │   │   └── settings/       # User preferences & settings
│   │   ├── app.routes.ts       # Application routing
│   │   └── app.ts              # Root application component
│   ├── main.ts                 # Client-side entry point
│   ├── main.server.ts          # Server-side entry point
│   ├── server.ts               # Express SSR server
│   └── styles.css              # Global styles & Tailwind imports
├── compose.yaml                # Docker Compose definition (autostart)
├── Dockerfile.dev              # Development Dockerfile with live reload
├── .dockerignore               # Optimized build exclusion rules
└── angular.json                # Angular CLI & builder configuration
```

---

## 🛠️ Available Scripts

| Command | Description |
| :--- | :--- |
| `npm start` | Starts the Angular development server on `localhost:4200` |
| `npm run build` | Builds client & server bundles in `dist/` |
| `npm run serve:ssr:Tracking_sheet` | Runs the compiled production SSR Express server |
| `npm run watch` | Builds continuously in development mode |
| `npm test` | Executes unit tests with [Vitest](https://vitest.dev/) |
| `npm run format` | Prettifies code across the entire codebase with Prettier |
| `npm run format:check` | Verifies formatting without altering files |

---

## 🐳 Docker & System Startup

The repository includes a dedicated `compose.yaml` with the `unless-stopped` restart policy:

- **Autostart on Boot**: As long as the Docker service is running on your machine, this container starts automatically whenever your laptop powers on.
- **Live Code Sync**: The project directory is mounted inside the container, meaning any changes made locally in your IDE immediately trigger hot reloads in the browser.
- **Isolated Dependencies**: Prevents host/container binary conflicts by isolating container `node_modules`.
