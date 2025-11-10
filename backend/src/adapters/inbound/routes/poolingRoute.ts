import express from "express";
import { PoolingController } from "../controllers/PoolingController.js";
import { PoolRepository } from "../../outbound/repository/PoolRepository.js";

const router = express.Router();
const controller = new PoolingController(new PoolRepository());

router.post("/", async (req, res) => {
  const pool = await controller.createPool(req.body);
  res.json(pool);
});

export default router;
