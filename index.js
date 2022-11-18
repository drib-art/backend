import express from "express";

// route defns
import { router as productsRouter } from "./routes/productsRouter.js";
import { router as collectionsRouter } from "./routes/collectionsRouter.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static("public"));


// All the API routes
app.get("/", (req, res)=>{
  res.sendStatus(403);
});

app.post("/login", (req, res)=>{
  // TODO: jwt token and all that authentication thing

  const user = req.body.user;
  // verify the username and password in the database

  // issue jwt
  res.send("currently not available");
    
});

app.use("/products", productsRouter);
app.use("/collections", collectionsRouter);


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
  console.log("---------- DRIB server started ------------");
});
