import { PrismaClient } from "@prisma/client";

export default async function seedDistricts(prisma: PrismaClient) {
  console.log("Vérification / création des arrondissements de Douala...");

  // 1. Récupérer l'ID de la ville de Douala
  const douala = await prisma.city.findFirst({
    where: { name: "Douala" },
  });

  if (!douala) {
    console.error(
      "Erreur : La ville de Douala doit être créée avant les arrondissements.",
    );
    return;
  }

  // 2. Liste des arrondissements de Douala
  const districts = [
    { name: "Douala 1er", cityId: douala.id },
    { name: "Douala 2ème", cityId: douala.id },
    { name: "Douala 3ème", cityId: douala.id },
    { name: "Douala 4ème", cityId: douala.id },
    { name: "Douala 5ème", cityId: douala.id },
    { name: "Douala 6ème", cityId: douala.id },
  ];

  // 3. Insertion avec upsert basé sur la contrainte unique [name, cityId]
  for (const district of districts) {
    await prisma.district.upsert({
      where: {
        name_cityId: {
          name: district.name,
          cityId: district.cityId,
        },
      },
      update: {},
      create: district,
    });
  }

  console.log("✅ Arrondissements de Douala vérifiés / créés !");
}
