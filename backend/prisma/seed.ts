import { PrismaClient, Prisma } from "@prisma/client";
import { userService } from "../src/services/user.service";

const prisma = new PrismaClient();

const main = async () => {
  try {
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();

    const hashedPassword = await userService.hashPassword("toga"); // Хешируем пароль каждого пользователя
    const alice = await prisma.user.create({
      data: {
        firstName: "Alice",
        lastName: "Alice",
        username: "toga",
        password: hashedPassword,
        role: 'ADMIN'
      }
    })
    await prisma.task.create({
      data: {
        title: 'Task 1',
        description: 'Description for Task 1',
        dueDate: new Date('2024-06-15'),
        priority: 'MEDIUM',
        status: 'IN_PROGRESS',
        creatorId: alice.id,
        responsibleId: alice.id
      }
    })

    await prisma.task.create({
      data: {
        title: 'Task 2',
        description: 'Description for Task 2',
        dueDate: new Date('2024-05-15'),
        priority: 'HIGH',
        status: 'TODO',
        creatorId: alice.id,
        responsibleId: alice.id
      }
    })

    console.log(`Database has been seeded. 🌱`);
  } catch (error) {
    throw error;
  }
}

main().catch((err) => {
  console.warn("Error While generating Seed: \n", err);
});
