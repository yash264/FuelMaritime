import express from "express";
import cors from "cors";
import routeRoutes from "../../adapters/inbound/routes/routeRoute.js";
import complianceRoutes from "../../adapters/inbound/routes/complianceRoute.js";
import bankingRoutes from "../../adapters/inbound/routes/bankingRoute.js";
import poolingRoutes from "../../adapters/inbound/routes/poolingRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/routes", routeRoutes);
app.use("/compliance", complianceRoutes);
app.use("/banking", bankingRoutes);
app.use("/pools", poolingRoutes);

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.message);
  res.status(500).json({ error: err.message });
});

export { app };
