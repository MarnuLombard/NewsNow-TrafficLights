import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // We've already run seeds
  const count = await prisma.dashboard.count();

  if (count > 0) {
    console.log('Database already seeded');

    return;
  }

  await prisma.dashboard.upsert({
    where: { name: 'heathcheck' },
    update: {},
    create: {
      name: 'healthcheck',
      default: true,
      trafficLights: {
        create: [
          { name: 'web interface' },
          { name: 'database cluster' },
          { name: 'loadbalancer' },
          { name: 'cache cluster' },
        ],
      },
    },
  });

  await prisma.dashboard.upsert({
    where: { name: 'terraform' },
    update: {},
    create: {
      name: 'terraform',
      default: false,
      trafficLights: {
        create: [
          { name: 'container d4197ea19b12' },
          { name: 'container 02241ea3e9b9' },
          { name: 'container 41ab638a8e9e' },
          { name: 'container 2a4bbe50c40b' },
        ],
      },
    },
  });

  await prisma.dashboard.upsert({
    where: { name: 'devops' },
    update: {},
    create: {
      name: 'devops',
      default: false,
      trafficLights: {
        create: [
          { name: 'CI pipeline' },
          { name: 'slack' },
          { name: 'git server' },
          { name: 'jira' },
          { name: 'terraform' },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
