import { Router } from "express";
import { toDatabase } from "../middlewares/dbHandler.js";
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../database/products.js";


export const router = Router();

// The routes defn

router.get("/", async (req, res) => {
  const dbResponse = await toDatabase(getAllProducts);
  if (!dbResponse) { return res.sendStatus(404).end(); }
  res.send(dbResponse);
});

router.post("/", async (req, res) => {
  const productData = req.body;
  const dbResponse = await toDatabase(createProduct, productData);
  if (!dbResponse) { return res.sendStatus(404).end(); }
  res.send(dbResponse);
});

router.get("/:id", async (req, res) => {
  const productId = req.params.id;
  const dbResponse = await toDatabase(getSingleProduct, productId);
  if (!dbResponse) { return res.sendStatus(404).end(); }
  res.send(dbResponse);
});

router.put("/:id", async (req, res) => {
  const productData = req.body;
  const dbResponse = await toDatabase(updateProduct, productData);
  if (!dbResponse) { return res.sendStatus(404).end(); }
  res.sendStatus(200);
});

router.delete("/:id", async (req, res) => {
  const productId = req.params.id;
  const dbResponse = await toDatabase(deleteProduct, productId);
  if (!dbResponse) { return res.sendStatus(404).end(); }
  res.sendStatus(200);
});


// TODO: still need to define patach routes -- need special care as to how to write this efficiently
