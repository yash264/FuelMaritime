import express from "express";
import { BankingController } from "../controllers/BankingController.js";
import { BankRepository } from "../../outbound/repository/BankRepository.js";

const router = express.Router();
const controller = new BankingController(new BankRepository());

router.post("/bank", async (req, res) => {
  const { shipId, year } = req.body;
  const entry = await controller.bankSurplus(shipId, year);
  res.json(entry);
});

router.post("/apply", async (req, res) => {
  const { shipId, year, amount } = req.body;
  const result = await controller.applyBankedCredit(shipId, year, amount);
  res.json(result);
});

export default router;
