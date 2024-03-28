import express from "express";
import cors from "cors";
const port = 3000;

import app from "./app";
import "./routes/v1/task.route";

app.use(express.json());

app.use(cors());

app.listen(port, () =>
  console.log(`Server is running at: http://localhost:${port}`)
);
