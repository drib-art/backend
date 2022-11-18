import { Router } from "express";

export const router = Router();



router.get("/", (req, res) => {
  res.send("Here are all your products");
});

router.post("/", (req, res) => {
  const productData = req.body;
});

router.get("/:id", (req, res) => {
  const productId = req.params.id;
  res.send(`The product ${productId}`);
});