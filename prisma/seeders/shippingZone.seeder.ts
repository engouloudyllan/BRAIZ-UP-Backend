import { PrismaClient } from "@prisma/client";

export default async function seedShippingZones(prisma: PrismaClient) {
  console.log("Vérification / création des zones de livraison...");

  // Récupérer les arrondissements de Douala
  const districts = await prisma.district.findMany({
    where: { city: { name: "Douala" } },
    include: { neighborhoods: true },
    orderBy: { name: "asc" },
  });

  if (!districts.length) {
    console.error("Erreur : Aucun arrondissement trouvé. Lancez d'abord le seed des districts.");
    return;
  }

  // Zones de livraison par arrondissement
  const zones = [
    { name: "Douala 1er – Centre", district: "Douala 1er", fee: 1000 },
    { name: "Douala 2ème – Bonabéri", district: "Douala 2ème", fee: 2000 },
    { name: "Douala 3ème – Logbaba", district: "Douala 3ème", fee: 2200 },
    { name: "Douala 4ème – Bonassama", district: "Douala 4ème", fee: 2300 },
    { name: "Douala 5ème – Bonamoussadi", district: "Douala 5ème", fee: 2000 },
  ];

  for (const zone of zones) {
    const district = districts.find((d) => d.name === zone.district);
    if (!district) {
      console.warn(`  ⚠ Arrondissement "${zone.district}" introuvable – ignoré.`);
      continue;
    }

    await prisma.shippingZone.upsert({
      where: { name: zone.name },
      update: { fee: zone.fee, isActive: true },
      create: {
        name: zone.name,
        fee: zone.fee,
        isActive: true,
        districtId: district.id,
      },
    });

    console.log(`  ✓ Zone "${zone.name}" — ${zone.fee} FCFA`);
  }

  console.log("Zones de livraison prêtes.\n");
}
