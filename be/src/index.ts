import express from "express";
import { router } from "./router/router";
import cors from "cors";

const app = express();

const port = 3001;

app.use(express.json());

app.use(cors());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(port, () => {
  console.log(`be слушает порт ${port}`);
});
