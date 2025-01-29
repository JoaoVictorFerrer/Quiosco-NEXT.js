import { PrismaClient } from '@prisma/client'
//crear una instacia que compruebe si ya tiene otra ionstacia abierta para no generar muchas instacias abiertas y relentizar la app 
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma