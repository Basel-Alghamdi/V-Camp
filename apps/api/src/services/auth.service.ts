import bcrypt from "bcryptjs";
import { prisma } from "@owners-platform/database";
import { signToken } from "../lib/jwt";
import type { RegisterInput } from "@owners-platform/validators";

function omitPassword<T extends { passwordHash: string }>(
  user: T
): Omit<T, "passwordHash"> {
  const { passwordHash, ...rest } = user;
  return rest;
}

export async function register(data: RegisterInput) {
  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existing) {
    const err = new Error("Email already in use") as Error & {
      statusCode: number;
    };
    err.statusCode = 409;
    throw err;
  }

  const passwordHash = await bcrypt.hash(data.password, 12);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash,
      role: data.role || "OWNER",
      buildingId: data.buildingId || null,
      unitNumber: data.unitNumber || null,
    },
  });

  const token = signToken({
    userId: user.id,
    role: user.role,
    buildingId: user.buildingId,
  });

  return { token, user: omitPassword(user) };
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    const err = new Error("Invalid credentials") as Error & {
      statusCode: number;
    };
    err.statusCode = 401;
    throw err;
  }

  const valid = await bcrypt.compare(password, user.passwordHash);

  if (!valid) {
    const err = new Error("Invalid credentials") as Error & {
      statusCode: number;
    };
    err.statusCode = 401;
    throw err;
  }

  const token = signToken({
    userId: user.id,
    role: user.role,
    buildingId: user.buildingId,
  });

  return { token, user: omitPassword(user) };
}

export async function getMe(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { building: true },
  });

  if (!user) {
    const err = new Error("User not found") as Error & { statusCode: number };
    err.statusCode = 404;
    throw err;
  }

  return omitPassword(user);
}
