import { Priority, Role, Status, User } from '@prisma/client';
import { taskService } from '../services/task.service';
import catchAsync from '../utils/catchAsync';
import passport from 'passport';
import { jwtOptions } from '../config/passport';
import jwt from 'jsonwebtoken';


interface CustomUser {
  id: string | undefined;
  role: string | undefined;
}

declare global {
  namespace Express {
    interface User extends CustomUser { }
  }
}

const getAllTasks = catchAsync(async (req, res) => {
  const allTasks = await taskService.getAllTasks();
  res.send(allTasks);
});


const createTask = catchAsync(async (req, res) => {

  if (req.user && req.user.id && req.user.role) {
    const taskData = {
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
      status: req.body.status,
      responsibleId: req.body.responsibleId,
      creatorId: req.user.id
    };

    const result = await taskService.createTask(taskData);
    res.send(result)

    // res.send('Profile Page');
  } else {
    res.status(401).send('Unauthorized');
  }

  // const taskData = {
  //   title: 'Task 1',
  //   description: 'Description for Task 1',
  //   dueDate: new Date('2024-06-15'),
  //   priority: Priority.LOW,
  //   status: Status.TODO,
  //   creatorId: '789a3e4e-e9e9-4d03-99f7-e404eeda5c42',
  //   responsibleId: '9a4a2c7c-42dc-4137-aaba-0b3f119793bf'
  // };
  // const result = await taskService.createTask(taskData);
  // res.send(result)
  // return res.status(201).json({ task: result.task });

  // const allTasks = await taskService.getAllTasks();
});


export const taskController = {
  getAllTasks,
  createTask
};

