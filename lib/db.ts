import 'dotenv/config'
import { PrismaClient } from './generated/prisma' // Custom output path se connect
import { PrismaNeon } from '@prisma/adapter-neon'

// Neon Serverless Connection
const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!, // Application queries ke liye pooler URL
})

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ 
    adapter,
    log: ['query'] 
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma