import { PrismaClient, Prisma } from "@prisma/client";

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
      const user = await prisma.user.create({
        data: u,
      });
      console.log(`Created user with id: ${user.id}`);
    }

    console.log(`Database has been seeded. 🌱`);
  } catch (error) {
    throw error;
  }
}

main().catch((err) => {
  console.warn("Error While generating Seed: \n", err);
});
