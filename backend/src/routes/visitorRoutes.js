import express from "express";
import {
  createVisitor,
  getAllVisitors,
  getVisitorById,
  updateVisitor,
  deleteVisitor,
} from "../controllers/visitorController.js";

const router = express.Router();

router.post("/", createVisitor);
router.get("/", getAllVisitors);
router.get("/:id", getVisitorById);
router.put("/:id", updateVisitor);
router.delete("/:id", deleteVisitor);

export default router;
