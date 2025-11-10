import express from "express";
import { ComplianceController } from "../controllers/ComplianceController.js";
import { ComplianceRepository } from "../../outbound/repository/ComplianceRespository.js";

const router = express.Router();
const controller = new ComplianceController(new ComplianceRepository());

router.get("/cb", async (req, res) => {
  const { shipId, year } = req.query;
  const cb = await controller.getComplianceBalance(String(shipId), Number(year));
  res.json(cb);
});

router.get("/adjusted-cb", async (req, res) => {
  const { shipId, year } = req.query;
  const cb = await controller.getAdjustedBalance(String(shipId), Number(year));
  res.json(cb);
});

export default router;
