import prisma from "~/server/db";

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      lastName: 'Joy',
      business: 'star',
      password: '5f4dcc3b5aa765d61d8327deb882cf99',
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      lastName: 'Ray',
      business: 'logans',
      password: '6c569aabbf7775ef8fc5705a9f1f9b2f',
    },
  });

  console.log({ alice, bob })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
