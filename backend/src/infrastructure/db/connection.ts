import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config(); // Load DATABASE_URL from .env

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Required for Neon
});

export async function connectDB() {
  try {
    const client = await db.connect();
    console.log("✅ Connected to PostgreSQL database (via pg)");
    client.release();
  } catch (err: any) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
}




