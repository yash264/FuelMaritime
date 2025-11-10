
import { app } from "./app.js";
import { connectDB } from "../db/connection.js"; // updated path

const PORT = 4000;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err: any) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
}

startServer();


