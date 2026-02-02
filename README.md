# 🧩 Pokedex

Fullstack application built with:

- Frontend: React + Vite + TypeScript
- Backend: Express + Prisma
- Database: PostgreSQL

---

# 🚀 Quick Start (Automatic Setup)

## Requirements

- Node.js 20+
- PostgreSQL installed and running
- Default user:
  - username: postgres
  - password: postgres
- Port 5432 available

---

## 1️⃣ Run setup

From the project root:

```bash
npm run setup
```

This command will:

- Install root, backend, and frontend dependencies
- Create backend/.env if it does not exist
- Run Prisma migrations
- Automatically create the database (if permissions allow it)

---

## 2️⃣ Start the project

From the project root:

```bash
npm run dev
```

---

## 🌐 Access

- Frontend → http://localhost:5173
- Backend → http://localhost:3000

---

# 🛠 Manual Setup (If Automatic Setup Fails)

If the automatic setup fails, follow these steps:

---

## 1️⃣ Create the database manually

Using psql or pgAdmin:

CREATE DATABASE pokedex;

---

## 2️⃣ Create backend/.env

File: backend/.env

Content:

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/pokedex"
PORT=3000

If your PostgreSQL username or password is different, update the connection string accordingly.

---

## 3️⃣ Install dependencies manually

From root:
npm install

Backend:
cd backend
npm install

Frontend:
cd ../frontend
npm install

---

## 4️⃣ Run Prisma migrations

From backend:

npx prisma migrate dev

---

## 5️⃣ Start the project

From root:

npm run dev

---

# 🧠 Notes

- PostgreSQL must be running before executing setup.
- If port 5432 is already in use, update the connection string in backend/.env.
- If your PostgreSQL user does not have permission to create databases, create the database manually first.

# Techs used

- React: Top library for frontend, no more to say.
- Vite: Quick for light projects
- Typescript: Data integrity
- React Query: Automatic handle of cache and better error handling
- Tailwind: Faster and better to understand in code
- Express: Easy to structure, better for light projects
- Prisma: Integrates with typescript, automatic migrations, data integrity
- Zod: Data validation, security

## 🧪 Running Tests

This project contains tests for both frontend and backend.

---

### ▶ Frontend Tests

```bash
cd frontend
npm run test
```

Watch mode:

```bash
npm run test:watch
```

With coverage:

```bash
npm run test:coverage
```

---

### ▶ Backend Tests

```bash
cd backend
npm run test
```

Watch mode:

```bash
npm run test:watch
```

---
