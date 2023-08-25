import { prisma } from './db';
import { fetchWithProxyRotation } from './fetcher';

async function main() {
    const articleIds = Array.from({ length: 5000 }, (_, i) => i + 1);
    await fetchWithProxyRotation(articleIds);
}

main()
    .catch(e => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
