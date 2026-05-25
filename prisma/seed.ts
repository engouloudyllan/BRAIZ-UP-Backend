import { PrismaClient } from "@prisma/client";
import seedRegions from "./seeders/regions.seeder.js";
import seedCities from "./seeders/cities.seeder.js";
import seedDistricts from "./seeders/districts.seeder.js";
import seedNeighborhoods from "./seeders/neighborhood.seeder.js";
import seedShippingZones from "./seeders/shippingZone.seeder.js";
import env from "../src/config/env.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: env.dbHost,
  port: Number(env.dbPort),
  connectionLimit: 5,
  database: env.dbName,
  user: env.dbUser,
  password: env.dbPassword,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Démarrage du seeding...\n");

  await seedRegions(prisma);
  await seedCities(prisma);
  await seedDistricts(prisma);
  await seedNeighborhoods(prisma);
  await seedShippingZones(prisma);

  console.log("\n Seeding terminé !");
}

main()
  .catch(async (e) => {
    console.error("Erreur durant le seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
