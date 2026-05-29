import { PrismaClient } from "@prisma/client";
import seedRegions from "./seeders/regions.seeder.js";
import seedCities from "./seeders/cities.seeder.js";
import seedDistricts from "./seeders/districts.seeder.js";
import seedNeighborhoods from "./seeders/neighborhood.seeder.js";
import seedShippingZones from "./seeders/shippingZone.seeder.js";
import seedRolesAndPermissions from "./seeders/roles.seeder.js";
import env from "../src/config/env.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import seedCategories from "./seeders/categories.seeder.js";
import seedProducts from "./seeders/products.seeder.js";

console.log("Host ciblé :", env.dbHost);
console.log("Port ciblé :", env.dbPort);

const adapter = new PrismaMariaDb({
  host: env.dbHost,
  port: Number(env.dbPort),
  connectionLimit: 1,
  database: env.dbName,
  user: env.dbUser,
  password: env.dbPassword,
  connectTimeout: 30000,
});


const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Démarrage du seeding...\n");

  await seedRolesAndPermissions(prisma);
  await seedRegions(prisma);
  await seedCities(prisma);
  await seedDistricts(prisma);
  await seedNeighborhoods(prisma);
  await seedShippingZones(prisma);
  await seedCategories(prisma);
  await seedProducts(prisma)

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
