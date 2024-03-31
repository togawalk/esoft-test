import { prisma } from "../lib/prisma";

const subordinatesByManagerId = async (managerId: string) => {

  const managerExists = await prisma.user.findUnique({
    where: {
      id: managerId
    }
  });

  if (!managerExists) {
    throw new Error('Manager with the specified ID does not exist');
  }

  const subordinates = await prisma.user.findMany({
    where: {
      managerId
    },
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      middleName: true,
      role: true
    }
  });

  return subordinates;
};

export const subordinatesService = {
  subordinatesByManagerId
};
