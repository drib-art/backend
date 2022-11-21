import express from "express";
import bcrypt from "bcrypt";

import { router as productsRouter } from "./routes/productsRouter.js";
import { router as collectionsRouter } from "./routes/collectionsRouter.js";
import { db } from "./database/config.js";
import { generateToken } from "./middlewares/auth.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// All the API routes
app.get("/", (req, res) => {
  res.sendStatus(404).end();
});

app.post("/login", async (req, res) => {
  const user = req.body.user;
  const pass = req.body.password;

  try {
    // verify the user exists in the database
    const [[data], meta] = await db.execute("SELECT * from Swoyam WHERE username = ?", [user]);
    if (!data) { return res.status(404).end(); }

    // verify the password provided
    const match = await bcrypt.compare(pass, data.password);
    if (!match) { return res.status(403).end(); }

    const jwt = generateToken({ username: user });
    res.send(JSON.stringify({ token: jwt }));

  } catch (error) {
    console.log(error); //TODO: remove in production
    res.status(404).end();
  }

});

app.use("/products", productsRouter);
app.use("/collections", collectionsRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("---------- DRIB server started ------------");
});