import { Router } from "express";

export const router = Router();

router.get("/", (req, res) => {
  res.send("Here are all your collections");
});

router.post("/", (req, res) => {
  // required only in dashboard
});

router.get("/:id", (req, res) => {
  const collectionId = req.params.id;
  res.send(`The collection ${collectionId}`);
});
