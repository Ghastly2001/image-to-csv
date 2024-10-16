import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import progress from "./routes/progress";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Testing");
});

app.use("/progress", progress);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
