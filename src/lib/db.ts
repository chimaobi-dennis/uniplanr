import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { env } from "@/env";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// DATABASE_URL must be the pooled (Supabase transaction pooler, port 6543) URL in serverless.
export const db =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter: new PrismaPg({ connectionString: env.DATABASE_URL }) });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
