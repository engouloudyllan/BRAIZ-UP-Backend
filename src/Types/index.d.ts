import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request { // “Partout dans Express, req possède maintenant : user”
      user?: User;
    }
  }
}

export type RegisterBody = {
  userName: string;
  email: string;
  password: string;
};

