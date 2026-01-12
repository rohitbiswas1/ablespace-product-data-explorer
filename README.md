# AbleSpace – Product Data Explorer

A full-stack application to scrape product data from World of Books and display it via a web interface.

## Tech Stack
- **Backend**: NestJS, Prisma, PostgreSQL, Crawlee, Playwright
- **Frontend**: Next.js (App Router), React Query, Tailwind CSS

## Prerequisites
- Node.js v20+
- PostgreSQL running locally (Database: `ablespace`)

## Setup & Run

### 1. Database
Ensure your local PostgreSQL is running.
The backend expects: `postgresql://postgres:postgres@localhost:5432/ablespace`
Update `backend/.env` if your credentials differ.

### 2. Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
```
Runs on: http://localhost:4000

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on: http://localhost:3000

## Features
- **Scraping**: Click "Refresh Data" on the frontend to trigger a background scrape.
- **Exploration**: Browse Categories and Products.
- **History**: Data is persisted in PostgreSQL.
