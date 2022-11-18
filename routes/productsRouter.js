import { Router } from "express";

import { getAllProducts } from "../database/config.js";
export const router = Router();

// The routes defn

router.get("/", async (req, res) => {
  const productsData = await getAllProducts();
  res.send(productsData);
});

router.post("/", (req, res) => {
  const productData = req.body;
});

router.get("/:id", (req, res) => {
  const productId = req.params.id;
  res.send(`The product ${productId}`);
});