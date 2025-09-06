import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';


const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@beauty.local';
  const exists = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!exists) {
    const passwordHash = await bcrypt.hash('Admin#1234', 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        firstName: 'Admin',
        lastName: 'Root',
        role: Role.ADMIN,
        passwordHash,
        loyaltyAccount: { create: {} },
      }
    });
    console.log('✅ Admin created:', adminEmail, 'pwd=Admin#1234');
  }

  // Catégories/services démo
  await prisma.category.upsert({
    where: { slug: 'soins-du-visage' },
    update: {},
    create: { name: 'Soins du visage', slug: 'soins-du-visage' }
  });

  await prisma.service.upsert({
    where: { id: 'seed-service-1' },
    update: {},
    create: {
      id: 'seed-service-1',
      name: 'Coiffure femme',
      durationMin: 60,
      price: 5000,
      currency: 'XAF',
      active: true
    }
  });

  console.log('✅ Seed done');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
