import express from "express";

import { router as productsRouter } from "./routes/productsRouter.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


// All the API routes
app.get("/", (req, res)=>{
  res.send("Wrong address, my friend");
});

app.post("/login", (req, res)=>{
  // TODO: jwt token and all that authentication thing

  const user = req.body.user;
  // verify the username and password in the database

  // issue jwt
  res.send("currently not available");
    
});

app.use("/products", productsRouter);


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
  console.log("---------- DRIB server started ------------");
});
