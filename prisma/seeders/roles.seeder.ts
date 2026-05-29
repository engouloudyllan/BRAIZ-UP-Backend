import { PrismaClient } from "@prisma/client";

const ROLES: { title: string; description: string }[] = [
  {
    title: "CLIENT",
    description: "Client final : peut commander, gérer son profil et ses adresses",
  },
  {
    title: "ADMIN",
    description:
      "Super administrateur : accès total (utilisateurs, rôles, produits, commandes, paramètres)",
  },
  {
    title: "ORDER_MANAGER",
    description:
      "Gestionnaire des commandes : peut consulter et changer les statuts des commandes",
  },
  {
    title: "DELIVERY",
    description: "Livreur : voit les commandes EN_LIVRAISON qui lui sont assignées",
  },
];

const PERMISSIONS: { title: string; description: string }[] = [
  { title: "USER_VIEW", description: "Voir les utilisateurs" },
  { title: "USER_MANAGE", description: "Créer/modifier/supprimer des utilisateurs" },
  { title: "ROLE_MANAGE", description: "Gérer les rôles et permissions" },
  { title: "PRODUCT_MANAGE", description: "Gérer le catalogue produits" },
  { title: "CATEGORY_MANAGE", description: "Gérer les catégories" },
  { title: "ORDER_VIEW", description: "Voir les commandes" },
  { title: "ORDER_UPDATE_STATUS", description: "Changer le statut d'une commande" },
  { title: "SHIPPING_MANAGE", description: "Gérer les zones de livraison" },
  { title: "SETTINGS_MANAGE", description: "Gérer les paramètres de l'application" },
];

const ROLE_PERMISSIONS: Record<string, string[]> = {
  CLIENT: [],
  ADMIN: PERMISSIONS.map((p) => p.title), // toutes
  ORDER_MANAGER: ["ORDER_VIEW", "ORDER_UPDATE_STATUS"],
  DELIVERY: ["ORDER_VIEW", "ORDER_UPDATE_STATUS"],
};

export default async function seedRolesAndPermissions(prisma: PrismaClient) {
  console.log("Vérification / création des rôles et permissions...");

  // Permissions
  for (const p of PERMISSIONS) {
    await prisma.permission.upsert({
      where: { title: p.title },
      update: { description: p.description },
      create: p,
    });
  }

  // Rôles
  for (const r of ROLES) {
    await prisma.role.upsert({
      where: { title: r.title },
      update: { description: r.description },
      create: r,
    });
  }

  // Lien rôle ↔ permissions
  for (const [roleTitle, permTitles] of Object.entries(ROLE_PERMISSIONS)) {
    const role = await prisma.role.findUnique({ where: { title: roleTitle } });
    if (!role) continue;

    // Reset
    await prisma.roleHasPermissions.deleteMany({ where: { roleId: role.id } });

    if (permTitles.length === 0) continue;

    const perms = await prisma.permission.findMany({
      where: { title: { in: permTitles } },
      select: { id: true },
    });

    if (perms.length) {
      await prisma.roleHasPermissions.createMany({
        data: perms.map((p) => ({ roleId: role.id, permissionId: p.id })),
      });
    }
  }

  console.log("  ✓ 4 rôles et", PERMISSIONS.length, "permissions configurés.");

  // ── Promotion automatique en ADMIN de l'email défini dans .env ─────────
  // + assignation du rôle CLIENT à tous les users qui n'ont aucun rôle.
  await assignDefaultRoles(prisma);
}

/**
 * Garantit que :
 *  - l'utilisateur dont l'email = ADMIN_EMAIL (env) reçoit le rôle ADMIN
 *  - tout utilisateur sans rôle reçoit au moins CLIENT
 *
 * Idempotent : ne duplique jamais un rôle déjà attribué.
 */
async function assignDefaultRoles(prisma: PrismaClient) {
  const adminEmail = process.env.ADMIN_EMAIL?.trim();

  const adminRole = await prisma.role.findUnique({ where: { title: "ADMIN" } });
  const clientRole = await prisma.role.findUnique({ where: { title: "CLIENT" } });
  if (!adminRole || !clientRole) return;

  // 1) Promotion en ADMIN
  if (adminEmail) {
    const adminUser = await prisma.user.findUnique({
      where: { email: adminEmail },
      include: { roles: true },
    });

    if (adminUser) {
      const already = adminUser.roles.some((r) => r.roleId === adminRole.id);
      if (!already) {
        await prisma.userHasRoles.create({
          data: { userId: adminUser.id, roleId: adminRole.id },
        });
        console.log(`  ✓ ${adminEmail} promu ADMIN.`);
      } else {
        console.log(`  • ${adminEmail} est déjà ADMIN.`);
      }
    } else {
      console.log(
        `  ⚠ Aucun utilisateur trouvé avec ADMIN_EMAIL=${adminEmail}. Inscrivez-vous d'abord avec cet email, puis relancez le seed.`,
      );
    }
  } else {
    console.log(
      "  ⚠ ADMIN_EMAIL non défini dans .env — aucune promotion ADMIN automatique.",
    );
  }

  // 2) Tous les users sans rôle → CLIENT
  const usersWithoutRoles = await prisma.user.findMany({
    where: { roles: { none: {} } },
    select: { id: true, email: true },
  });
  if (usersWithoutRoles.length) {
    await prisma.userHasRoles.createMany({
      data: usersWithoutRoles.map((u) => ({
        userId: u.id,
        roleId: clientRole.id,
      })),
      skipDuplicates: true,
    });
    console.log(
      `  ✓ ${usersWithoutRoles.length} utilisateur(s) sans rôle → CLIENT attribué.`,
    );
  }

  console.log("");
}
