import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const router: Router = express.Router();

router.get("/:id", async (req, res) => {
  const prisma = new PrismaClient();
  const { id } = req.params;
  try {
    const progress = await prisma.request.findUnique({
      where: {
        id: id,
      },
    });
    if (!progress) {
      res.status(404).json({ error: "Progress not found" });
    }
    res.status(200).json({ id: id, status: progress?.status });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
