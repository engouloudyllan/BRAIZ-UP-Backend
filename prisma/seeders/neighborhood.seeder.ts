import { PrismaClient } from "@prisma/client";

export default async function seedNeighborhoods(prisma: PrismaClient) {
  console.log("Vérification / création des quartiers de Douala...");

  // 1. Récupérer les arrondissements de Douala pour obtenir leurs IDs
  const districts = await prisma.district.findMany({
    where: { city: { name: "Douala" } },
  });

  const districtMap = districts.reduce<Record<string, number>>((acc, d) => {
    acc[d.name] = d.id;
    return acc;
  }, {});

  // 2. Définition des quartiers par arrondissement
  const neighborhoodData = [
    {
      district: "Douala 1er",
      neighborhoods: ["Akwa", "Bonapriso", "Bonanjo", "Bali"],
    },
    {
      district: "Douala 2ème",
      neighborhoods: [
        "New-Bell",
        "Quartier Congo",
        "Akwa-Nord",
        "Grand Moulin",
      ],
    },
    {
      district: "Douala 3ème",
      neighborhoods: [
        "Logbaba",
        "Pk14",
        "Nyalla",
        "Makea",
        "Bepanda",
        "Village",
      ],
    },
    {
      district: "Douala 4ème",
      neighborhoods: ["Bonabéri", "Mambanda", "Bojongo", "Bekoko", "Bangue"],
    },
    {
      district: "Douala 5ème",
      neighborhoods: [
        "Makepe",
        "Logpom",
        "Kotto",
        "Cité des Palmiers",
        "PK8",
        "PK10",
        "Ange Raphaël",
      ],
    },
    {
      district: "Douala 6ème",
      neighborhoods: ["Manoka", "Idenau", "Souelaba"],
    },
  ];

  // 3. Insertion
  for (const group of neighborhoodData) {
    const districtId = districtMap[group.district];

    if (!districtId) {
      console.warn(
        `Arrondissement introuvable : ${group.district}, passage au suivant.`,
      );
      continue;
    }

    for (const name of group.neighborhoods) {
      await prisma.neighborhood.upsert({
        where: {
          name_districtId: {
            name: name,
            districtId: districtId,
          },
        },
        update: {},
        create: {
          name: name,
          districtId: districtId,
        },
      });
    }
  }

  console.log("✅ Tous les quartiers de Douala ont été vérifiés / créés !");
}
