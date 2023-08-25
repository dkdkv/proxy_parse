import axios from 'axios';
import { Product, Proxy } from '@prisma/client';
import {URL_TEMPLATE, TIMEOUT, MAX_RETRIES, PROXY_COOLDOWN, MAX_REQUESTS_PER_PROXY} from './config';
import {prisma} from "./db";

export async function fetchData(articleId: number, proxy: Proxy): Promise<Product | null> {
    let retries = 0;

    while (retries < MAX_RETRIES) {
        try {
            const response = await axios.get(URL_TEMPLATE.replace('{ARTICLE_ID}', articleId.toString()),
                {
                    proxy: {
                        host: proxy.ip,
                        port: proxy.port,
                        auth: {
                            username: proxy.login,
                            password: proxy.password,
                        }
                    },
                    timeout: TIMEOUT,
                }
            );

            if (response.data && typeof response.data === 'object') {
                return response.data as Product;
            }
        } catch (error) {
            retries++;
            if (retries >= MAX_RETRIES) {
                console.error(`Failed to fetch data for articleId: ${articleId}, ${error}`);
                return null;
            }
        }
    }
    return null;
}

export async function fetchWithProxyRotation(articleIds: number[]) {
    const proxies = await prisma.proxy.findMany();
    let proxyIndex = 0;
    type ServerResponse = Product & {
        images?: any[];
    };

    for (let i = 0; i < articleIds.length; i += MAX_REQUESTS_PER_PROXY) {
        const currentIds = articleIds.slice(i, i + MAX_REQUESTS_PER_PROXY);

        const promises = currentIds.map(async (articleId) => {
            const data: ServerResponse | null = await fetchData(articleId, proxies[proxyIndex]);

            if (data) {
                try {
                    const { images, id: productId, ...dataWithoutId } = data;
                    await prisma.product.create({
                        data: {
                            ...dataWithoutId,
                            productId: productId,
                        },
                    });
                    console.log(`Inserted product for articleId: ${articleId}`);
                } catch (error) {
                    console.error(`Failed to insert product for articleId: ${articleId}. Error: ${error}`);
                }
            }
        });

        await Promise.all(promises);
        proxyIndex++;
        if (proxyIndex >= proxies.length) {
            proxyIndex = 0;
            await new Promise(res => setTimeout(res, PROXY_COOLDOWN));
        }
    }
}
