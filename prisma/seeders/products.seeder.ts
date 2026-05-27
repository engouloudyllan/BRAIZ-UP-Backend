import { PrismaClient } from "@prisma/client";

export default async function seedProducts(prisma: PrismaClient) {
  console.log("🌱 Début du seeding...");

  // ==========================================
  // 1. SEEDING DES CATÉGORIES
  // ==========================================
  const categoriesData = [
    { name: "Grillades", description: "Viandes et poissons braisés au feu de bois.", image: "static/categories/grillades.webp" },
    { name: "Nos Plats", description: "Spécialités locales et plats mijotés.", image: "static/categories/nos-plats.webp" },
    { name: "Mignardises", description: "Douceurs pour terminer sur une note sucrée.", image: "static/categories/mignardises.webp" },
    { name: "Sandwiches", description: "Casse-croûtes rapides et gourmands.", image: "static/categories/sandwiches.webp" },
    { name: "Jus", description: "Jus naturels et rafraîchissements.", image: "static/categories/jus.webp" },
  ];

  for (const cat of categoriesData) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: cat,
      create: cat,
    });
  }
  console.log("✅ Catégories créées/mises à jour !");

  // On récupère les catégories depuis la base de données pour avoir leurs IDs réels
  const categoriesDb = await prisma.category.findMany();
  
  // Petite fonction utilitaire pour trouver l'ID d'une catégorie
  const getCatId = (name: string) => {
    const cat = categoriesDb.find(c => c.name === name);
    if (!cat) throw new Error(`Catégorie ${name} introuvable !`);
    return cat.id;
  };

  // ==========================================
  // 2. SEEDING DES PRODUITS (6 par catégorie)
  // ==========================================
  const productsData = [
    // --- GRILLADES ---
    {
      name: "Poulet Braisé Entier",
      description: "Délicieux poulet mariné aux épices secrètes et braisé au feu de bois.",
      categoryId: getCatId("Grillades"),
      price: 6500,
      cookingDuration: 45,
      images: ["https://placehold.co/600x400/ffaa00/white?text=Poulet+Braise+1", "static/product/poulet-braise-2.jpg"]
    },
    {
      name: "Poisson Bar Braisé",
      description: "Gros poisson bar frais, grillé avec ses condiments verts.",
      categoryId: getCatId("Grillades"),
      price: 8000,
      cookingDuration: 40,
      images: ["https://placehold.co/600x400/ffaa00/white?text=Poisson+Bar+1", "static/product/poisson-bar-2.jpg"]
    },
    {
      name: "Brochettes de Boeuf (Soya)",
      description: "Tendres morceaux de boeuf épicés, servis par 5.",
      categoryId: getCatId("Grillades"),
      price: 2500,
      cookingDuration: 15,
      images: ["https://placehold.co/600x400/ffaa00/white?text=Brochettes+1", "static/product/brochettes-2.jpg"]
    },
    {
      name: "Travers de Porc",
      description: "Côtes de porc caramélisées et grillées à la perfection.",
      categoryId: getCatId("Grillades"),
      price: 5500,
      cookingDuration: 35,
      images: ["https://placehold.co/600x400/ffaa00/white?text=Porc+Braise+1", "static/product/porc-2.jpg"]
    },
    {
      name: "Saucisses Grillées",
      description: "Saucisses de viande marinées avec une sauce piquante douce.",
      categoryId: getCatId("Grillades"),
      price: 3000,
      cookingDuration: 20,
      images: ["https://placehold.co/600x400/ffaa00/white?text=Saucisses+1", "static/product/saucisses-2.jpg"]
    },
    {
      name: "Gambas Grillées",
      description: "Grosses crevettes grillées à l'ail et au beurre persillé.",
      categoryId: getCatId("Grillades"),
      price: 10000,
      cookingDuration: 25,
      images: ["https://placehold.co/600x400/ffaa00/white?text=Gambas+1", "static/product/gambas-2.jpg"]
    },

    // --- NOS PLATS ---
    {
      name: "Ndolé à la Viande",
      description: "L'incontournable Ndolé camerounais, servi avec de la viande de boeuf tendre.",
      categoryId: getCatId("Nos Plats"),
      price: 4500,
      cookingDuration: 60,
      images: ["https://placehold.co/600x400/00aa44/white?text=Ndole+Viande+1", "static/product/ndole-2.jpg"]
    },
    {
      name: "Poulet DG",
      description: "Le fameux plat de Directeur Général : poulet, frites de plantain et légumes.",
      categoryId: getCatId("Nos Plats"),
      price: 5000,
      cookingDuration: 50,
      images: ["https://placehold.co/600x400/00aa44/white?text=Poulet+DG+1", "static/product/poulet-dg-2.jpg"]
    },
    {
      name: "Eru avec Water Fufu",
      description: "Plat traditionnel riche et savoureux, accompagné de son fufu.",
      categoryId: getCatId("Nos Plats"),
      price: 4000,
      cookingDuration: 55,
      images: ["https://placehold.co/600x400/00aa44/white?text=Eru+Water+Fufu+1", "static/product/eru-2.jpg"]
    },
    {
      name: "Koki (Gâteau de Cornille)",
      description: "Gâteau de haricots cuit à la vapeur dans des feuilles de bananier, servi avec plantain.",
      categoryId: getCatId("Nos Plats"),
      price: 3000,
      cookingDuration: 90,
      images: ["https://placehold.co/600x400/00aa44/white?text=Koki+1", "static/product/koki-2.jpg"]
    },
    {
      name: "Poisson Salé aux Aubergines",
      description: "Mijoté de poisson salé avec de délicieuses aubergines locales.",
      categoryId: getCatId("Nos Plats"),
      price: 4500,
      cookingDuration: 45,
      images: ["https://placehold.co/600x400/00aa44/white?text=Poisson+Sale+1", "static/product/poisson-sale-2.jpg"]
    },
    {
      name: "Sanga",
      description: "Un délicieux mélange de maïs doux, de feuilles de manioc et de jus de noix de palme.",
      categoryId: getCatId("Nos Plats"),
      price: 2500,
      cookingDuration: 60,
      images: ["https://placehold.co/600x400/00aa44/white?text=Sanga+1", "static/product/sanga-2.jpg"]
    },

    // --- MIGNARDISES ---
    {
      name: "Beignets Soufflés",
      description: "Petits beignets dorés et moelleux, parfaits pour le goûter.",
      categoryId: getCatId("Mignardises"),
      price: 1000,
      cookingDuration: 15,
      images: ["https://placehold.co/600x400/aa4444/white?text=Beignets+1", "static/product/beignets-2.jpg"]
    },
    {
      name: "Crêpes au Chocolat",
      description: "Crêpes chaudes tartinées au chocolat noisette, vendues par 3.",
      categoryId: getCatId("Mignardises"),
      price: 1500,
      cookingDuration: 10,
      images: ["https://placehold.co/600x400/aa4444/white?text=Crepes+1", "static/product/crepes-2.jpg"]
    },
    {
      name: "Salade de Fruits Frais",
      description: "Mélange de fruits de saison locaux (ananas, papaye, pastèque).",
      categoryId: getCatId("Mignardises"),
      price: 1500,
      cookingDuration: 5,
      images: ["https://placehold.co/600x400/aa4444/white?text=Salade+Fruits+1", "static/product/salade-fruits-2.jpg"]
    },
    {
      name: "Fondant au Chocolat",
      description: "Gâteau au cœur coulant de chocolat chaud.",
      categoryId: getCatId("Mignardises"),
      price: 2500,
      cookingDuration: 15,
      images: ["https://placehold.co/600x400/aa4444/white?text=Fondant+1", "static/product/fondant-2.jpg"]
    },
    {
      name: "Tartelettes aux Fraises",
      description: "Pâte sablée croquante et crème pâtissière surmontée de fraises fraîches.",
      categoryId: getCatId("Mignardises"),
      price: 2000,
      cookingDuration: 0,
      images: ["https://placehold.co/600x400/aa4444/white?text=Tartelettes+1", "static/product/tartelettes-2.jpg"]
    },
    {
      name: "Croquettes (Merveilles)",
      description: "Petits biscuits secs légèrement parfumés à la muscade et à la vanille.",
      categoryId: getCatId("Mignardises"),
      price: 1000,
      cookingDuration: 0,
      images: ["https://placehold.co/600x400/aa4444/white?text=Croquettes+1", "static/product/croquettes-2.jpg"]
    },

    // --- SANDWICHES ---
    {
      name: "Burger Braiz'Up Maison",
      description: "Steak haché frais, fromage fondu, salade, tomate et sauce secrète.",
      categoryId: getCatId("Sandwiches"),
      price: 3500,
      cookingDuration: 15,
      images: ["https://placehold.co/600x400/6644aa/white?text=Burger+1", "static/product/burger-2.jpg"]
    },
    {
      name: "Shawarma Viande",
      description: "Pain libanais garni de viande émincée, légumes frais et sauce ail.",
      categoryId: getCatId("Sandwiches"),
      price: 2500,
      cookingDuration: 10,
      images: ["https://placehold.co/600x400/6644aa/white?text=Shawarma+1", "static/product/shawarma-2.jpg"]
    },
    {
      name: "Sandwich Poulet Mayo",
      description: "Pain baguette croustillant avec émietté de poulet et mayonnaise assaisonnée.",
      categoryId: getCatId("Sandwiches"),
      price: 2000,
      cookingDuration: 5,
      images: ["https://placehold.co/600x400/6644aa/white?text=Poulet+Mayo+1", "static/product/poulet-mayo-2.jpg"]
    },
    {
      name: "Panini Jambon Fromage",
      description: "Pain ciabatta pressé à chaud avec du jambon et double fromage fondant.",
      categoryId: getCatId("Sandwiches"),
      price: 2500,
      cookingDuration: 10,
      images: ["https://placehold.co/600x400/6644aa/white?text=Panini+1", "static/product/panini-2.jpg"]
    },
    {
      name: "Hot Dog Braiz'Up",
      description: "Saucisse grillée, pain brioché, moutarde, ketchup et oignons frits.",
      categoryId: getCatId("Sandwiches"),
      price: 1500,
      cookingDuration: 5,
      images: ["https://placehold.co/600x400/6644aa/white?text=Hot+Dog+1", "static/product/hot-dog-2.jpg"]
    },
    {
      name: "Croque-Monsieur",
      description: "Pain de mie toasté avec jambon, fromage et béchamel onctueuse.",
      categoryId: getCatId("Sandwiches"),
      price: 2000,
      cookingDuration: 10,
      images: ["https://placehold.co/600x400/6644aa/white?text=Croque+Monsieur+1", "static/product/croque-monsieur-2.jpg"]
    },

    // --- JUS ---
    {
      name: "Jus de Foléré (Bissap)",
      description: "Jus rafraîchissant de fleurs d'hibiscus parfumé à la menthe.",
      categoryId: getCatId("Jus"),
      price: 1000,
      cookingDuration: 0,
      images: ["https://placehold.co/600x400/44aaaa/white?text=Folere+1", "static/product/folere-2.jpg"]
    },
    {
      name: "Jus de Baobab (Bouye)",
      description: "Boisson onctueuse et nourrissante au pain de singe.",
      categoryId: getCatId("Jus"),
      price: 1500,
      cookingDuration: 0,
      images: ["https://placehold.co/600x400/44aaaa/white?text=Baobab+1", "static/product/baobab-2.jpg"]
    },
    {
      name: "Jus de Gingembre (Djindja)",
      description: "Boisson piquante et vivifiante au gingembre frais et citron.",
      categoryId: getCatId("Jus"),
      price: 1000,
      cookingDuration: 0,
      images: ["https://placehold.co/600x400/44aaaa/white?text=Djindja+1", "static/product/djindja-2.jpg"]
    },
    {
      name: "Jus d'Ananas Nature",
      description: "100% pur jus d'ananas frais pressé à la commande.",
      categoryId: getCatId("Jus"),
      price: 1500,
      cookingDuration: 5,
      images: ["https://placehold.co/600x400/44aaaa/white?text=Ananas+1", "static/product/ananas-2.jpg"]
    },
    {
      name: "Citronnade Maison",
      description: "Jus de citron frais pressé avec un léger sirop de canne et des glaçons.",
      categoryId: getCatId("Jus"),
      price: 1000,
      cookingDuration: 5,
      images: ["https://placehold.co/600x400/44aaaa/white?text=Citronnade+1", "static/product/citronnade-2.jpg"]
    },
    {
      name: "Jus de Pastèque",
      description: "Jus très doux et désaltérant à la pastèque fraîche.",
      categoryId: getCatId("Jus"),
      price: 1500,
      cookingDuration: 5,
      images: ["https://placehold.co/600x400/44aaaa/white?text=Pasteque+1", "static/product/pasteque-2.jpg"]
    }
  ];

  for (const product of productsData) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: product,
      create: product,
    });
  }

  console.log("✅ Seeding des 30 produits terminé avec succès !");
}
