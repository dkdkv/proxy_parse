import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    for (let i = 1; i <= 50; i++) {
        await prisma.proxy.create({
            data: {
                ip: `192.168.1.${i}`,
                port: 8080,
                login: `user${i}`,
                password: `pass${i}`,
            },
        });
    }
}

main()
    .catch(e => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
