import { prisma } from "../lib/prisma";

const getAllTasks = async () => {
  const allTasks = await prisma.task.findMany({
    include: {
      creator: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          middleName: true,
          username: true,
          password: false,
        },
      }
    },
  })

  return allTasks
};

export const taskService = {
  getAllTasks,
};
