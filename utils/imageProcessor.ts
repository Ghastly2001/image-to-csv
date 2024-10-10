import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

async function processImage(inputImageUrl: string) {
  // const response = await axios.get(url, { responseType: 'arraybuffer' });
  // const buffer = Buffer.from(response.data, 'binary');
  // const compressedBuffer = await sharp(buffer)
  //     .resize({ width: Math.floor(response.data.width / 2) })
  //     .toBuffer();

  const outputUrl = `https://fake-storage-service/${uuidv4()}.jpg`;
  // Here we would upload the compressedBuffer to any of the storage service and get the outputUrl
  // For this example, we will just return a fake URL

  return outputUrl;
}

const prisma = new PrismaClient();

async function processImages(requestId: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        requestId,
      },
    });
    for (const product of products) {
      const outputImageUrls = [];
      for (const inputImageUrl of product.inputImageUrls) {
        const outputImageUrl = await processImage(inputImageUrl);
        outputImageUrls.push(outputImageUrl);
      }

      await prisma.product.update({
        where: {
          requestId,
        },
        data: {
          outputImageUrls: outputImageUrls,
        },
      });
    }
    await prisma.request.update({
      where: {
        id: requestId,
      },
      data: {
        status: "COMPLETED",
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    // await axios.post(webhookURL, { requestId, status: 'FAILED' });
    await prisma.request.update({
      where: {
        id: requestId,
      },
      data: {
        status: "FAILED",
        updatedAt: new Date(),
      },
    });
  }
}

export default processImages;
