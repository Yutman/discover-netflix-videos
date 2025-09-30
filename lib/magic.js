import {Magic} from '@magic-sdk/admin';

let cachedMagicAdmin = null;

export function getMagicAdmin() {
  if (cachedMagicAdmin) return cachedMagicAdmin;

  const serverKey = process.env.MAGIC_SERVER_KEY;
  
  if (!serverKey) {
    console.error('❌ Magic server key (MAGIC_SERVER_KEY) is missing');
    console.error('Available environment variables:', Object.keys(process.env).filter(key => key.includes('MAGIC')));
    throw new Error('Authentication service is temporarily unavailable. Please try again in a moment.');
  }

  try {
    // Initialize Magic Admin with proper configuration for Magic Link
    cachedMagicAdmin = new Magic(serverKey, {
      // Ensure we're using the correct network configuration
      network: 'mainnet' // or 'testnet' for development
    });
    
    return cachedMagicAdmin;
  } catch (error) {
    console.error('❌ Magic Admin initialization failed:', error);
    throw new Error('Authentication service is temporarily unavailable. Please try again in a moment.');
  }
}