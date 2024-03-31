import { Priority, Status, Task } from "@prisma/client";
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
      },
    },
  });

  return allTasks;
};

const getTasksByUserAndDate = async (responsibleId: string, range: string) => {
  let endDate = new Date();

  switch (range) {
    case 'today':
      endDate = new Date();
      break;
    case 'week':
      endDate.setDate(new Date().getDate() + 7);
      break;
    case 'future':
      endDate.setDate(new Date().getDate() + 365);
      break;
    default:
      return [];
  }
  const tasks = await prisma.task.findMany({
    where: {
      responsibleId: responsibleId,
      dueDate: { lte: endDate },
    },
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
      },
    },
  });


  return tasks;
};


const createTask = async ({
  title,
  description,
  dueDate,
  priority,
  status,
  creatorId,
  responsibleId,
}: {
  title: string;
  description: string;
  dueDate: Date;
  priority: Priority;
  status: Status;
  creatorId: string;
  responsibleId: string;
}) => {
  const createdTask = await prisma.task.create({
    data: {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      status: status,
      creator: { connect: { id: creatorId } },
      responsible: { connect: { id: responsibleId } },
    },
  });

  return createdTask;
};

export const taskService = {
  getAllTasks,
  createTask,
  getTasksByUserAndDate
};
