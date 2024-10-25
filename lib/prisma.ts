import { PrismaClient } from "@prisma/client";

const prismaClientsingleton = ()=> {
    return new PrismaClient();
}
type prismaClientsingletonType = ReturnType<typeof prismaClientsingleton>;

const globalForPrisma =  globalThis as unknown as { prisma?: PrismaClient };

const prisma = globalForPrisma.prisma ??  prismaClientsingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;