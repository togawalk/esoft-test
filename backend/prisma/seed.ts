import { PrismaClient, Prisma } from "@prisma/client";
import { userService } from "../src/services/user.service";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    firstName: "Alice",
    lastName: "Alice",
    username: "toga",
    password: "toga"
  },
  {
    firstName: "Zhenya",
    lastName: "Zhenya",
    username: "togawalk",
    password: "togawalk"
  },
];

const main = async () => {
  try {
    await prisma.user.deleteMany();
    await prisma.task.deleteMany();

    for (const u of userData) {
      const hashedPassword = await userService.hashPassword(u.password); // Хешируем пароль каждого пользователя
      const user: Prisma.UserCreateInput = {
        firstName: u.firstName,
        lastName: u.lastName,
        username: u.username,
        password: hashedPassword
      };

      const createdUser = await prisma.user.create({
        data: user,
      });

      console.log(`Created user with id: ${createdUser.id}`);

    }

    console.log(`Database has been seeded. 🌱`);
  } catch (error) {
    throw error;
  }
}

main().catch((err) => {
  console.warn("Error While generating Seed: \n", err);
});
