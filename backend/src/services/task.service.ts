import { Priority, Status, Task } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { subordinatesService } from "./subordinates.service";

const getAllTasks = async () => {
  const allTasks = await prisma.task.findMany({
    include: {
      responsible: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          middleName: true,
          username: true,
          password: false,
        },
      },
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

const updateTask = async (taskId: string, updatedTaskData: any) => {
  console.log(updatedTaskData);

  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: updatedTaskData,
    });

    return updatedTask;
  } catch (error) {
    console.error(error);
    throw new Error("Could not update task");
  }
};

const getTasksByUserAndDate = async (responsibleId: string, range: string) => {
  let endDate = new Date();

  switch (range) {
    case "today":
      endDate = new Date();
      break;
    case "week":
      endDate.setDate(new Date().getDate() + 7);
      break;
    case "future":
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

const getTaskById = async (taskId: string) => {
  const taskExists = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });

  if (!taskExists) {
    throw new Error("Task with the specified ID does not exist");
  }

  return taskExists;
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
  const validOperation = await subordinatesService.isSupervisorForSubordinate(
    creatorId,
    responsibleId,
  );

  if (!validOperation) {
    throw new Error("Selected subordinate is not a subordinate of the manager");
  }

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
  getTasksByUserAndDate,
  getTaskById,
  updateTask,
};
