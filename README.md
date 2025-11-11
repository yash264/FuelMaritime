# 🚢 FuelMaritime Backend

A backend service for managing maritime fuel efficiency and emissions KPIs — including vessel routes, ship compliance, carbon banking, and pool aggregation.

This project follows **Hexagonal (Ports & Adapters)** architecture for scalability and maintainability.

---

## 🧭 Overview

**FuelMaritime** helps track greenhouse gas (GHG) intensity, fuel consumption, and emissions for different vessel types and routes.  
It supports:
- Tracking emission metrics for shipping routes (`Route` table)
- Ship compliance with carbon benchmarks (`ShipCompliance`)
- Carbon banking for emissions savings or deficits (`BankEntry`)
- Pool-based grouping and calculations (`Pool`, `PoolMember`)

Backend is built with:
- **Node.js + TypeScript**
- **Express**
- **PostgreSQL (Neon / Supabase compatible)**
- **pg library (Postgres driver)**
- Optional Prisma integration (can be removed if not needed)

---

## 🧱 Architecture Summary

### 🧩 Hexagonal (Ports & Adapters) Overview
```
src/
│
├── core/ # Domain Layer (business logic)
│ ├── domain/ # Entities (pure domain models)
│ ├── ports/ # Interfaces (Inbound/Outbound)
│ └── services/ # Use cases and domain logic
│
├── infrastructure/ # External Adapters
│ ├── db/ # PostgreSQL connection + repositories
│ ├── server/ # Express app + API routes
│ └── config/ # Environment configs
│
├── application/ # Application layer (use case orchestration)
└── tests/ # Integration & unit tests
```

### 🔌 Data Flow
HTTP Request → Controller (Inbound Port)
→ Service / Use Case (Core Logic)
→ Repository (Outbound Port)
→ Database (PostgreSQL)

```bash
git clone https://github.com/yourusername/FuelMaritime.git
cd FuelMaritime/backend
npm install
# Neon / PostgreSQL connection URLs
DATABASE_URL="postgresql://neondb_owner:<password>@<your-neon-host>/neondb?sslmode=require"
npx ts-node --esm src/infrastructure/server/index.ts

EndPoints
GET http://localhost:4000/api/routes
GET http://localhost:4000/api/routes/baseline
```
