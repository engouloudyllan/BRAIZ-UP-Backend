import { PrismaClient } from "@prisma/client";

export default async function seedCities(prisma: PrismaClient) {
  console.log("Vérification / création des villes...");

  // 1. Récupérer les régions pour obtenir leurs IDs dynamiquement
  const regions = await prisma.region.findMany();

  // Map pour accès rapide : { "Littoral": 1, "Centre": 2, ... }
  const regionMap = regions.reduce(
    (acc, region) => {
      acc[region.name] = region.id;
      return acc;
    },
    {} as Record<string, number>,
  );

  const cities = [
    { name: "Douala", regionId: regionMap["Littoral"] },
    { name: "Edéa", regionId: regionMap["Littoral"] },
    { name: "Yaoundé", regionId: regionMap["Centre"] },
    { name: "Bafoussam", regionId: regionMap["Ouest"] },
    { name: "Garoua", regionId: regionMap["Nord"] },
  ];

  for (const city of cities) {
    // Vérification de sécurité au cas où la région n'existerait pas
    if (!city.regionId) {
      console.warn(
        ` Région non trouvée pour la ville: ${city.name}, saut de l'insertion.`,
      );
      continue;
    }

    await prisma.city.upsert({
      where: {
        name_regionId: {
          name: city.name,
          regionId: city.regionId,
        },
      },
      update: {},
      create: city,
    });
  }

  console.log("✅ Villes vérifiées / créées !");
}
