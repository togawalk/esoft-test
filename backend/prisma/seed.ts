import { PrismaClient, Prisma } from "@prisma/client";
import { userService } from "../src/services/user.service";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const main = async () => {
  try {
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();

    const adminHashedPassword = await userService.hashPassword("admin");
    const userHashedPassword = await userService.hashPassword("user");

    const admin = await prisma.user.create({
      data: {
        firstName: "Alice",
        lastName: faker.person.lastName("female"),
        username: "admin",
        password: adminHashedPassword,
        role: "ADMIN",
      },
    });

    await prisma.user.create({
      data: {
        firstName: "Evgeny",
        lastName: faker.person.lastName("male"),
        username: "user",
        password: userHashedPassword,
        role: "USER",
        managerId: admin.id,
      },
    });
    const user = await prisma.user.create({
      data: {
        firstName: "Corina",
        lastName: faker.person.lastName("female"),
        username: "corina",
        password: userHashedPassword,
        role: "USER",
        managerId: admin.id,
      },
    });
    await prisma.task.create({
      data: {
        title: "Task 1",
        description: "Description for Task 1",
        dueDate: new Date("2024-06-15"),
        priority: "MEDIUM",
        status: "IN_PROGRESS",
        creatorId: admin.id,
        responsibleId: user.id,
      },
    });

    await prisma.task.create({
      data: {
        title: "Task 2",
        description: "Description for Task 2",
        dueDate: new Date("2024-05-15"),
        priority: "HIGH",
        status: "TODO",
        creatorId: admin.id,
        responsibleId: user.id,
      },
    });

    await prisma.task.create({
      data: {
        title: "Task 4",
        description: "Description for Task 2",
        dueDate: new Date("2024-05-15"),
        priority: "HIGH",
        status: "TODO",
        creatorId: admin.id,
        responsibleId: admin.id,
      },
    });

    await prisma.task.create({
      data: {
        title: "NEW TASK 23",
        description: "Description for Task 2",
        dueDate: new Date("2024-04-02"),
        priority: "HIGH",
        status: "TODO",
        creatorId: admin.id,
        responsibleId: admin.id,
      },
    });

    await prisma.task.create({
      data: {
        title: "NEW TASK",
        description: "Description for Task 2",
        dueDate: new Date("2024-03-31"),
        priority: "HIGH",
        status: "TODO",
        creatorId: admin.id,
        responsibleId: admin.id,
      },
    });

    console.log(`Database has been seeded. 🌱`);
  } catch (error) {
    throw error;
  }
};

main().catch((err) => {
  console.warn("Error While generating Seed: \n", err);
});
