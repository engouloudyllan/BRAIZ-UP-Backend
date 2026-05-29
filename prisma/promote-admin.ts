/**
 * Script CLI : promouvoir un utilisateur en ADMIN.
 *
 * Usage:
 *   tsx prisma/promote-admin.ts <email>
 *
 * Exemple:
 *   tsx prisma/promote-admin.ts juliodifo155@gmail.com
 */
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import env from "../src/config/env.js";

const adapter = new PrismaMariaDb({
  host: env.dbHost,
  port: Number(env.dbPort),
  connectionLimit: 5,
  database: env.dbName,
  user: env.dbUser,
  password: env.dbPassword,
  connectTimeout: 20000,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.argv[2]?.trim();
  if (!email) {
    console.error("❌ Usage: tsx prisma/promote-admin.ts <email>");
    process.exit(1);
  }

  const user = await prisma.user.findUnique({
    where: { email },
    include: { roles: { include: { role: true } } },
  });
  if (!user) {
    console.error(`❌ Aucun utilisateur trouvé avec l'email "${email}".`);
    process.exit(1);
  }

  const adminRole = await prisma.role.findUnique({ where: { title: "ADMIN" } });
  if (!adminRole) {
    console.error(
      "❌ Rôle ADMIN introuvable. Lancez d'abord : npx prisma db seed",
    );
    process.exit(1);
  }

  const already = user.roles.some((r) => r.role.title === "ADMIN");
  if (already) {
    console.log(`✓ ${email} est déjà ADMIN.`);
    return;
  }

  await prisma.userHasRoles.create({
    data: { userId: user.id, roleId: adminRole.id },
  });

  console.log(`✅ ${email} a été promu ADMIN avec succès.`);
  console.log("   → Déconnectez-vous puis reconnectez-vous pour rafraîchir le token.");
}

main()
  .catch((e) => {
    console.error("Erreur:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
