import { config } from 'dotenv';
config();

export const URL_TEMPLATE = process.env.URL_TEMPLATE || '';
export const MAX_REQUESTS_PER_PROXY = Number(process.env.MAX_REQUESTS_PER_PROXY);
export const PROXY_COOLDOWN = Number(process.env.PROXY_COOLDOWN);
export const TIMEOUT = Number(process.env.TIMEOUT);
export const MAX_RETRIES = Number(process.env.MAX_RETRIES);
