/**
 * Augmentation globale du type Express.Request.
 *
 * On déclare ici la forme "safe" du user attaché par auth.middleware.ts :
 * - PAS de password (jamais)
 * - PAS des champs internes Prisma (createdAt, updatedAt etc.)
 * - INCLUT roles[] : tableau de titres de rôles (CLIENT, ADMIN, ...)
 *
 * Conséquence : partout où on importe express.Request, req.user a la bonne shape.
 * Plus besoin d'AuthenticatedRequest spécifique (qui devient un simple alias).
 */
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        firstName: string | null;
        lastName: string | null;
        phoneNumber: string | null;
        profileImage: string | null;
        isVerified: boolean;
        roles: string[];
      };
    }
  }
}

export type RegisterBody = {
  userName: string;
  email: string;
  password: string;
};

export {};
