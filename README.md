# 📚 Ablespace Product Data Explorer

A **full-stack web scraping and product exploration system** that collects book data from **World of Books**, stores it in a database, and exposes it through REST APIs for frontend consumption.

This project focuses on **real-world scraping, backend API design, database modeling, and full-stack integration** rather than UI polish.

---

## 🚀 Project Overview

**Ablespace Product Data Explorer** demonstrates:

- Automated web scraping using **Playwright + Crawlee**
- Backend API development using **NestJS**
- Database schema design with **Prisma ORM**
- Cloud-ready PostgreSQL using **Neon**
- Frontend product listing using **React + Vite**
- Complete data flow:
  
  **Scraper → Database → API → Frontend**

---

## 🧠 Features

### ✅ Backend
- Scrapes:
  - Navigation categories
  - Book categories
  - Product listings
  - Product details (price, description, ratings)
- Stores data in **PostgreSQL** using **Prisma ORM**
- REST APIs:
  - `GET /products` – Fetch all products
  - `POST /jobs/run` – Manually trigger scraping

### ✅ Frontend
- Fetches product data from backend API
- Displays:
  - Book title
  - Price
  - Product image (when available)
- Built using **Vite + React**

---

## 🏗️ Tech Stack

### Backend
- Node.js
- NestJS
- Playwright
- Crawlee
- Prisma ORM
- PostgreSQL (Neon)

### Frontend
- React
- Vite
- Tailwind CSS

---
```
📂 Project Structure
ablespace-product-data-explorer/
│
├── backend/
│   ├── src/
│   │   ├── scrape/              # Scrapers (navigation, category, product)
│   │   ├── product/             # Product APIs
│   │   ├── jobs/                # Scrape trigger API
│   │   └── common/              # Prisma service
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── pages/
│   │
│   └── package.json
│
└── README.md





## ⚙️ Environment Setup

### 🔹 Backend `.env`

DATABASE_URL="postgresql://<username>:<password>@<neon-host>/<dbname>"
PORT=4000




## 🧪 Running the Project Locally

### 1️⃣ Backend Setup
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
Backend runs on:

http://localhost:4000

2️⃣ Run Scraper

Trigger scraping manually:

curl -X POST http://localhost:4000/jobs/run

3️⃣ Verify Data
curl http://localhost:4000/products

4️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

📸 Screenshots (Optional)

You may include:

Scraper execution logs

Products API JSON response

Frontend product listing UI

⚠️ Known Limitations

Some product images may not load due to:

Lazy loading

CDN restrictions

Large category scraping may increase memory usage

Anti-bot protections may slow scraping

🌐 Deployment Status

🚧 Deployment Not Completed

This project is fully functional in a local development environment.

Deployment is not completed at this time due to:

Scraping-related hosting restrictions

Resource and time constraints

Avoiding misuse of scraping on free cloud tiers

Planned Deployment (Future)

Backend: Railway / Render / Fly.io

Frontend: Vercel / Netlify

Database: Neon PostgreSQL

Lack of deployment does not affect project completeness or learning outcomes.

🎓 Academic Note

This project was developed as part of an academic submission to demonstrate:

Practical web scraping techniques

RESTful API design

Database schema modeling

Full-stack system integration

👤 Author

Rohit Biswas
B.Tech CSE (AIML)
Brainware University

📧 Email: rohitbiswasiam@gmail.com

🌐 GitHub: https://github.com/rohitbiswas1

⭐ Final Note

This project emphasizes architecture, data flow, and real-world backend concepts.

All core functionalities are successfully implemented and verified locally.


