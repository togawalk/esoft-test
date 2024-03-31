import express, { Router } from "express";
import cors from "cors";

const app = express();
export const router = Router();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

export default app;
