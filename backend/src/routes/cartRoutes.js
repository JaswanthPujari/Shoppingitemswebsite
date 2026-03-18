import express from "express";
import {
  getCart,
  addToCart,
  incQty,
  decQty,
  deleteItem
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", getCart);
router.post("/", addToCart);
router.put("/inc/:id", incQty);
router.put("/dec/:id", decQty);
router.delete("/del/:id", deleteItem);

export default router;