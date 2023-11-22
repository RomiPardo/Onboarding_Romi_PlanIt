import prisma from "~/server/db";
import bcrypt from "bcryptjs";
import { ServiceType } from "@prisma/client";
import { create } from "domain";

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
      lastName: "Joy",
      business: "star",
      image: "/userImage/example.png",
      hashedPassword: await bcrypt.hash("Contra1234", 10),
      points: 202,
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      name: "Bob",
      lastName: "Ray",
      business: "logans",
      hashedPassword: await bcrypt.hash("Contra1234", 10),
      role: "ADMIN",
      points: 1023,
    },
  });

  const filipa = await prisma.provider.upsert({
    where: { name: "Filipa.io" },
    update: {},
    create: {
      name: "Filipa.io",
    },
  });

  const filipaMiniBox = await prisma.service.upsert({
    where: { name: "Mini Box Salada" },
    update: {},
    create: {
      type: "PRESENT",
      name: "Mini Box Salada",
      image: "/service/filipaMiniBox.png",
      price: 495,
      qualification: 4.95,
      providerId: filipa.id,
    },
  });

  const filipaLunchBox = await prisma.service.upsert({
    where: { name: "Lunch Box" },
    update: {},
    create: {
      type: "PRESENT",
      name: "Lunch Box",
      image: "/service/lunchBox.png",
      price: 495,
      qualification: 4.84,
      providerId: filipa.id,
      description:
        "Cada Lunch box  de Filipa contiene los siguientes productos: \n- 2 scones de semillas \n- 1 alfajor de maicena \n- 1 alfajor de chocolate \n- 1 jugo de naranja natural",
      aditionals: {
        createMany: {
          data: [
            { name: "Pan de Pita relleno - Mini", price: 25 },
            { name: "Pan de Pita relleno - Grande", price: 50 },
            { name: "Agregar logo de tu empresa", price: 0 },
            { name: "Agregar una tarjeta con mensaje", price: 0 },
          ],
        },
      },
    },
  });

  await createServices();
}

const createServices = async () => {
  const provider = await prisma.provider.upsert({
    where: { name: "Provedor Aux" },
    update: {},
    create: {
      name: "Provedor Aux",
    },
  });

  for (let i = 0; i < 25; i++) {
    for (const type of Object.values(ServiceType)) {
      const serviceName = `Service ${type.slice(0, 3)} ${i + 1}`;

      await prisma.service.upsert({
        where: { name: serviceName },
        update: {},
        create: {
          type: type,
          name: serviceName,
          price: generateRandomPrice(),
          qualification: generateRandomQualification(),
          providerId: provider.id,
        },
      });
    }
  }
};

const generateRandomQualification = () => {
  const randomInteger = Math.floor(Math.random() * 10);
  const randomDecimal = Math.floor(Math.random() * 10) / 10;
  const randomNumber = randomInteger + randomDecimal;
  return randomNumber;
};

const generateRandomPrice = () => {
  return Math.floor(Math.random() * (5000 - 100) + 100);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
