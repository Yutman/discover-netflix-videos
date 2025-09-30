import {Magic} from '@magic-sdk/admin';

let cachedMagicAdmin = null;

export function getMagicAdmin() {
  if (cachedMagicAdmin) return cachedMagicAdmin;

  const serverKey = process.env.MAGIC_SERVER_KEY;
  
  // Debug logging to validate environment variable
  console.log('🔍 Magic Debug - Environment Check:');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('MAGIC_SERVER_KEY exists:', !!serverKey);
  console.log('MAGIC_SERVER_KEY length:', serverKey ? serverKey.length : 0);
  console.log('MAGIC_SERVER_KEY starts with sk_live_ or sk_test_:', serverKey ? serverKey.startsWith('sk_live_') || serverKey.startsWith('sk_test_') : false);
  
  if (!serverKey) {
    console.error('❌ Magic server key (MAGIC_SERVER_KEY) is missing');
    console.error('Available env vars:', Object.keys(process.env).filter(key => key.includes('MAGIC')));
    throw new Error('Magic server key (MAGIC_SERVER_KEY) is missing. Ensure it is set in Vercel env for Production and Preview.');
  }

  console.log('✅ Magic server key found, initializing Magic Admin...');
  cachedMagicAdmin = new Magic(serverKey);
  return cachedMagicAdmin;
}