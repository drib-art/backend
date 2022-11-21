import { Router } from "express";
import { db } from "../database/config.js";
import { setPatchQuery } from "../database/operations.js";
import { authenticateUser } from "../middlewares/auth.js";

export const router = Router();


router.get("/", async (req, res) => {
  try {
    const [data, meta] = await db.execute("SELECT * from Products");
    res.send(JSON.stringify(data));
  } catch (error) {
    console.log(error);// TODO: remove in production
    await db.end(); // FIXME: tis' better dunno??
    res.status(404).end();
  }

});


router.post("/", authenticateUser, async (req, res) => {
  const productData = req.body;
  const sqlQuery = "INSERT INTO Products (name, slug, price, stock, description, thumb, image, lovedBy, collectionsId) VALUES (?,?,?,?,?,?,?,?,?)"

  try {
    const [data, meta] = await db.execute(sqlQuery, [productData.name, productData.slug, productData.price, productData.stock, productData.description, productData.thumb, productData.image, productData.lovedBy, productData.collectionsId]);
    res.send(JSON.stringify({ id: data.insertId }));

  } catch (error) {
    console.log(error);// TODO: remove in production
    await db.end(); // FIXME: tis' better dunno??
    res.status(404).end();
  }

});


router.get("/:id", async (req, res) => {
  const productId = req.params.id;
  const sqlQuery = "SELECT * from Products WHERE id=?";

  try {
    const [[data], meta1] = await db.execute(sqlQuery, [productId]);
    res.send(JSON.stringify(data));
  } catch (error) {
    console.log(error);// TODO: remove in production
    await db.end(); // FIXME: tis' better dunno??
    res.status(404).end();
  }

});


router.delete("/:id", authenticateUser, async (req, res) => {
  const productId = req.params.id;

  try {
    await db.execute("DELETE from Products WHERE id = ?", [productId]);
    res.status(200).end();
  } catch (error) {
    console.log(error);// TODO: remove in production
    await db.end(); // FIXME: tis' better dunno??
    res.status(404).end();
  }
});


router.patch("/:id", authenticateUser, async (req, res) => {
  const productId = req.params.id;
  const patchData = req.body;

  try {
    await db.execute("UPDATE Products SET " + setPatchQuery(patchData) + " WHERE id = ?", [productId]);
    res.status(200).end();
  } catch (error) {
    console.log(error);// TODO: remove in production
    await db.end(); // FIXME: tis' better dunno??
    res.status(404).end();
  }

});
