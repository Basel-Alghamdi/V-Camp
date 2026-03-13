import { Role } from "@prisma/client";

export type { Role };

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: Role;
        buildingId: string | null;
      };
    }
  }
}
