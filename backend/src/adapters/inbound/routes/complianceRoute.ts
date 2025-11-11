import express from "express";
import { ComplianceController } from "../controllers/ComplianceController.js";
import { ComplianceRepository } from "../../outbound/repository/ComplianceRespository.js";

const router = express.Router();
const controller = new ComplianceController(new ComplianceRepository());

router.post("/cb", async (req, res) => {
  const { routeId, year } = req.body;
  console.log("Request body:", req.body);
  console.log(routeId,year);

  // Validate inputs
  if (!routeId) {
    return res.status(400).json({ error: "routeId is required" });
  }

  const numericYear = Number(year);
  if (isNaN(numericYear)) {
    return res.status(400).json({ error: "year must be a valid number" });
  }
  const cb = await controller.getComplianceBalance(String(routeId), Number(year));
  res.json(cb);
});

router.post("/adjustCb", async (req, res) => {
  const { routeId, year } = req.body;
  console.log(routeId,year);

  // Validate inputs
  if (!routeId) {
    return res.status(400).json({ error: "routeId is required" });
  }

  const numericYear = Number(year);
  if (isNaN(numericYear)) {
    return res.status(400).json({ error: "year must be a valid number" });
  }

  const cb = await controller.getAdjustedBalance(String(routeId), Number(year));
  res.json(cb);
});

export default router;
