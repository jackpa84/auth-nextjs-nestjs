import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create demo user
  const hashedPassword = await bcrypt.hash('password123', 12);
  
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      password: hashedPassword,
    },
  });

  // Create sample posts
  await prisma.post.createMany({
    data: [
      {
        title: 'Welcome to Modern Full-Stack App',
        content: 'This is a sample post demonstrating our modern full-stack application.',
        published: true,
        authorId: user.id,
      },
      {
        title: 'Getting Started with NestJS and NextJS',
        content: 'Learn how to build modern applications with these powerful frameworks.',
        published: true,
        authorId: user.id,
      },
    ],
  });

  console.log('Database seeded successfully!');
  console.log('Demo user created:');
  console.log('Email: demo@example.com');
  console.log('Password: password123');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });