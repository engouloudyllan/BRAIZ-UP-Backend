import { PrismaClient } from "@prisma/client";

export default async function seedRegions(prisma: PrismaClient) {
  console.log("Vérification / création des régions...");

  const regions = [
    { name: "Littoral" },
    { name: "Centre" },
    { name: "Ouest" },
    { name: "Nord" },
    { name: "Sud" },
    { name: "Extrême-Nord" },
    { name: "Adamaoua" },
    { name: "Est" },
    { name: "Nord-Ouest" },
    { name: "Sud-Ouest" },
  ];

  for (const region of regions) {
    await prisma.region.upsert({
      where: { name: region.name },
      update: {},
      create: region,
    });
  }

  console.log("✅ Régions vérifiées / créées !");
}
