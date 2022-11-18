import { Router } from "express";
import { prisma } from "../database/prisma.js";

export const router = Router();

router.get("/", async (req, res) => {
  const products = await prisma.products.findMany();
  res.send(products);
});

router.post("/", (req, res) => {
  const productData = req.body;
});

router.get("/:id", (req, res) => {
  const productId = req.params.id;
  res.send(`The product ${productId}`);
});