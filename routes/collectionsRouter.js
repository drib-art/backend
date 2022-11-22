import { Router } from "express";
import { db } from "../database/config.js";
import { setPatchQuery } from "../database/operations.js";
import { authenticateUser } from "../middlewares/auth.js";

export const router = Router();


router.get("/", async (req, res) => {
  try {
    const [data, meta] = await db.execute("SELECT * from Collections");
    res.send(JSON.stringify(data));
  } catch (error) {
    console.log(error);// TODO: remove in production
    await db.end(); // FIXME: tis' better dunno??
    res.status(404).end();
  }

});


router.post("/", authenticateUser, async (req, res) => {
  const collectionData = req.body;
  const sqlQuery = "INSERT INTO Collections (name, slug, description) VALUES (?,?,?)"

  try {
    const [data, meta] = await db.execute(sqlQuery, [collectionData.name, collectionData.slug, collectionData.description]);
    res.send(JSON.stringify({ id: data.insertId }));
  } catch (error) {
    console.log(error);// TODO: remove in production
    await db.end(); // FIXME: tis' better dunno??
    res.status(404).end();
  }

});


router.get("/:id", async (req, res) => {
  const collectionId = req.params.id;
  const sqlQuery1 = "SELECT * from Collections WHERE id =?";
  const sqlQuery2 = "SELECT name, slug, price, stock, description, thumb, lovedBy from Products WHERE collectionsId=? ORDER BY janma DESC";

  try {
    const [[collections], meta1] = await db.execute(sqlQuery1, [collectionId]);
    const [products, meta2] = await db.execute(sqlQuery2, [collectionId]);

    res.send(JSON.stringify({ ...collections, products: products }));
  } catch (error) {
    console.log(error);// TODO: remove in production
    await db.end(); // FIXME: tis' better dunno??
    res.status(404).end();
  }

});


router.delete("/:id", authenticateUser, async (req, res) => {
  const collectionId = req.params.id;

  try {
    await db.execute("DELETE from Collections WHERE id = ?", [collectionId]);
    res.status(200).end();
  } catch (error) {
    console.log(error);// TODO: remove in production
    await db.end(); // FIXME: tis' better dunno??
    res.status(404).end();
  }
});


router.patch("/:id", authenticateUser, async (req, res) => {
  const collectionId = req.params.id;
  const patchData = req.body;

  try {
    await db.execute("UPDATE Collections SET " + setPatchQuery(patchData) + " WHERE id = ?", [collectionId]);
    res.status(200).end();
  } catch (error) {
    console.log(error);// TODO: remove in production
    await db.end(); // FIXME: tis' better dunno??
    res.status(404).end();
  }

});
