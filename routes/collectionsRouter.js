import { Router } from "express";

export const router = Router();

// The routes defn

router.get("/", (req, res) => {
  res.send("Here are all your collections");
});

router.post("/", (req, res) => {
  const collectionData = req.body;
});

router.get("/:id", (req, res) => {
  const collectionId = req.params.id;
  res.send(`The product ${collectionId}`);
});
