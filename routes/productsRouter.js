import { Router } from "express";

export const router = Router();


// The routes defn

router.get("/", (req, res)=>{
  res.send("Here are all your products");
})