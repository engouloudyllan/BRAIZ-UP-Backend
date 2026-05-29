import { PrismaClient } from "@prisma/client";

const categories = [
  {
    name: "Grillades",
    description: "De délicieuses viandes et poissons grillés au feu de bois.",
    image: "static/categories/grillades.webp", // Chemin d'image par défaut
  },
  {
    name: "Nos Plats",
    description: "Nos spécialités cuisinées maison avec des ingrédients frais.",
    image: "static/categories/nos-plats.webp",
  },
  {
    name: "Mignardises",
    description:
      "Douceurs et petites gourmandises pour finir sur une note sucrée.",
    image: "static/categories/mignardises.webp",
  },
  {
    name: "Sandwiches",
    description: "Des sandwiches gourmands préparés à la minute.",
    image: "static/categories/sandwiches.webp",
  },
  {
    name: "Jus",
    description: "Jus de fruits frais pressés et boissons rafraîchissantes.",
    image: "static/categories/jus.webp",
  },
];

export default async function seedCategories(prisma: PrismaClient) {
  console.log("🌱 Début du seeding des catégories...");

  for (const category of categories) {
    // L'upsert évite les doublons si tu relances le seeder plusieurs fois
    await prisma.category.upsert({
      where: { name: category.name }, // Condition (nécessite que 'name' soit @unique dans schema.prisma)
      update: {
        description: category.description,
        image: category.image,
      },
      create: category,
    });
  }

  console.log("✅ Seeding des catégories terminé avec succès !");
}
