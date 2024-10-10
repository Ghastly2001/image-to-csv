import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function startProcessing() {
  const pendingRequest = await prisma.request.findMany({
    where: {
      status: "PENDING",
    },
  });
  for (const request of pendingRequest) {
    await prisma.request.update({
      where: {
        id: request.id,
      },
      data: {
        status: "IN_PROGRESS",
        updatedAt: new Date(),
      },
    });
  }
}

startProcessing();
