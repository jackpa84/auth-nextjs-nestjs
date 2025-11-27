import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  
  const hashedPassword = await bcrypt.hash('password123', 12);
  
  const user1 = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: hashedPassword,
      name: 'John Doe',
    },
  });

  console.log('✅ User created:', user1.email);

  
  await prisma.post.createMany({
    data: [
      {
        title: 'First Post',
        content: 'This is the first post content',
        published: true,
        authorId: user1.id,
      },
      {
        title: 'Second Post',
        content: 'This is the second post content',
        published: true,
        authorId: user1.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Posts created');
  console.log('🎉 Seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });