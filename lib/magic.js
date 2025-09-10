import {Magic} from '@magic-sdk/admin';

let cachedMagicAdmin = null;

export function getMagicAdmin() {
  if (cachedMagicAdmin) return cachedMagicAdmin;

  const serverKey = process.env.MAGIC_SERVER_KEY;
  if (!serverKey) {
    throw new Error('Magic server key (MAGIC_SERVER_KEY) is missing. Ensure it is set in Vercel env for Production and Preview.');
  }

  cachedMagicAdmin = new Magic(serverKey);
  return cachedMagicAdmin;
}