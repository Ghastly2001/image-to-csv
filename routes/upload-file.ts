import express, { Request as ExpressRequest, Response, Router } from "express";
import multer from "multer";
import csv from "csv-parser";
import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router: Router = express.Router();
const upload = multer({ dest: "uploads/" });

interface CsvRow {
  "S. No.": string;
  "Product Name": string;
  "Input Image Urls": string;
}

interface ProductArray {
  serialNumber: string;
  productName: string;
  inputImageUrls: string[];
  requestId: string;
}

router.post("/", upload.single("file"), async (req, res) => {
  const file: Express.Multer.File | undefined = req.file;

  if (!file) {
    res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const newRequest = await prisma.request.create({
      data: {},
    });

    const products: Array<ProductArray> = [];

    if (file?.path) {
      fs.createReadStream(file.path)
        .pipe(csv())
        .on("data", (row: CsvRow) => {
          const {
            "S. No.": serialNumber,
            "Product Name": productName,
            "Input Image Urls": inputImageUrls,
          } = row;

          const product = {
            requestId: newRequest.id,
            serialNumber: serialNumber,
            productName,
            inputImageUrls: inputImageUrls
              .split(",")
              .map((url: string) => url.trim()),
          };

          products.push(product);
        })
        .on("end", async () => {
          await prisma.product.createMany({
            data: products,
            skipDuplicates: true,
          });

          res.status(201).json({ requestId: newRequest.id });
          fs.unlinkSync(file.path);
        });
    } else {
      res.status(400).json({ error: "File path is undefined" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
