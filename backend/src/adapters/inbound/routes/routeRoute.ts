import express from "express";
import { RouteController } from "../controllers/RouteController.js";
import { RouteRepository } from "../../outbound/repository/RouteRepository.js";

const router = express.Router();
const controller = new RouteController(new RouteRepository());

router.get("/", async (req, res) => {
  const routes = await controller.getAllRoutes();
  res.json(routes);
});

router.post("/:id/baseline", async (req, res) => {
  await controller.setBaseline(req.params.id);
  res.json({ message: "Baseline set" });
});

router.get("/comparison", async (req, res) => {
  const result = await controller.getComparison();
  res.json(result);
});

export default router;
