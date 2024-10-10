import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();
router.post("/", async (req, res) => {
  try {
    const { requestId, status } = req.body;
    if (!requestId || !status) {
      res.status(400).json({ error: "Invalid webhook payload" });
    }

    const request = await prisma.request.findUnique({
      where: {
        id: requestId,
      },
    });
    if (!request) {
      res.status(404).json({ error: "Request not found" });
    }

    await prisma.request.update({
      where: {
        id: requestId,
      },
      data: {
        status: status,
      },
    });

    res.status(200).json({ message: "Saved Webhook Successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
