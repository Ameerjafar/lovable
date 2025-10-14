import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import { routes } from "./routes/routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', routes);

app.listen(process.env.BACKEND_PORT, () => {
  console.log("port is running on", process.env.BACKEND_PORT);
});
