import express, { Router } from "express";

const app = express();
export const router = Router();

app.use("/api/v1", router);

export default app;
