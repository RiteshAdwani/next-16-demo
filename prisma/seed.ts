import 'dotenv/config';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';


async function main() {
  console.log('🌱 Seeding database...');


  // Flush old data
  await prisma.clap.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Create test users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.create({
    data: {
      email: 'john@example.com',
      password: hashedPassword,
      name: 'John Doe',
    }
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'jane@example.com',
      password: hashedPassword,
      name: 'Jane Smith',
    }
  });

  console.log('✅ Users created:', { user1: user1.email, user2: user2.email });

  // Create sample posts with authorId
  const post1 = await prisma.post.create({
    data: {
      title: 'Welcome to Next.js 16',
      content: `Next.js 16 introduces amazing new features like Cache Components, improved caching APIs, and more!

This is a demo app showcasing all the new features in Next.js 16. Feel free to explore and test the clap feature - you can give up to 50 claps per post!

Key features include:
- Cache Components with "use cache" directive
- New caching APIs: updateTag(), revalidateTag(), refresh()
- proxy.ts replacing middleware.ts
- React Compiler support (stable)
- Turbopack as default bundler`,
      totalClaps: 0,
      authorId: user1.id,
    }
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'Understanding Cache Components',
      content: `Cache Components are a revolutionary feature in Next.js 16 that makes caching explicit and flexible.

With the new "use cache" directive, you can cache pages, components, and functions with automatic cache key generation.

Unlike the implicit caching found in previous versions of the App Router, caching with Cache Components is entirely opt-in. All dynamic code in any page, layout, or API route is executed at request time by default.

This gives Next.js an out-of-the-box experience that's better aligned with what developers expect from a full-stack application framework.`,
      totalClaps: 0,
      authorId: user2.id,
    }
  });


  const post3 = await prisma.post.create({
    data: {
      title: 'The Power of Server Actions',
      content: `Server Actions in Next.js allow you to write backend logic directly in your components without creating API routes.

Combined with the new caching APIs like updateTag() and revalidateTag(), they provide a seamless full-stack experience.

Key benefits:
- No need for API routes
- Type-safe by default
- Progressive enhancement
- Automatic error handling
- Built-in loading states

Server Actions are marked with 'use server' directive and can be called directly from client components.`,
      totalClaps: 0,
      authorId: user1.id,
    }
  });

  console.log('✅ Posts created:', { 
    post1: post1.title, 
    post2: post2.title, 
    post3: post3.title 
  });

  console.log('\n📧 Test Login Credentials:');
  console.log('   Email: john@example.com');
  console.log('   Password: password123');
  console.log('\n   Email: jane@example.com');
  console.log('   Password: password123');
  console.log('\n✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
