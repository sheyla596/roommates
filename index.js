import express from "express";
const app=express();
const port = 3000;
import router from "./routes/routes.js";

app.listen(port, () => {
    console.log(`El servidor está inicializado en el puerto http://localhost:${port}`);
  });

//middleware
app.use(express.json());
app.use("/",router);

