import { prisma } from "../lib/prisma";

const subordinatesByManagerId = async (managerId: string) => {
  const managerExists = await prisma.user.findUnique({
    where: {
      id: managerId,
    },
  });

  if (!managerExists) {
    throw new Error("Manager with the specified ID does not exist");
  }

  const subordinates = await prisma.user.findMany({
    where: {
      managerId,
    },
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      middleName: true,
      role: true,
    },
  });

  return subordinates;
};

const isSupervisorForSubordinate = async (
  managerId: string,
  subordinateId: string,
) => {
  const subordinate = await prisma.user.findUnique({
    where: {
      id: subordinateId,
      managerId: managerId,
    },
  });

  if (!subordinate) {
    return false;
  }

  return true;
};

export const subordinatesService = {
  subordinatesByManagerId,
  isSupervisorForSubordinate,
};
