import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Check if admin exists already
  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: "admin@example.com",
    },
  });

  if (!existingAdmin) {
    // Create admin user
    const hashedPassword = await hash("admin123", 10);
    
    await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
        phone: "123-456-7890",
      },
    });
    
    console.log('Admin user created successfully!');
  } else {
    console.log('Admin user already exists, skipping creation.');
  }
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });