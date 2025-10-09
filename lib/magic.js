import {Magic} from '@magic-sdk/admin';

let cachedMagicAdmin = null;

export function getMagicAdmin() {
  if (cachedMagicAdmin) return cachedMagicAdmin;

  const serverKey = process.env.MAGIC_SERVER_KEY;
  
  // Enhanced production debugging
  console.log('🔍 Magic Admin Debug - Production Environment:');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('VERCEL_ENV:', process.env.VERCEL_ENV);
  console.log('MAGIC_SERVER_KEY exists:', !!serverKey);
  console.log('MAGIC_SERVER_KEY length:', serverKey ? serverKey.length : 0);
  console.log('MAGIC_SERVER_KEY starts with sk_:', serverKey ? serverKey.startsWith('sk_') : false);
  console.log('All MAGIC env vars:', Object.keys(process.env).filter(key => key.includes('MAGIC')));
  
  if (!serverKey) {
    console.error('❌ Magic server key (MAGIC_SERVER_KEY) is missing in production');
    console.error('Available environment variables:', Object.keys(process.env).filter(key => key.includes('MAGIC')));
    throw new Error('Authentication service is temporarily unavailable. Please try again in a moment.');
  }

  try {
    // Initialize Magic Admin with proper configuration for Magic Link
    cachedMagicAdmin = new Magic(serverKey, {
      // Ensure we're using the correct network configuration
      network: 'mainnet' // or 'testnet' for development
    });
    
    console.log('✅ Magic Admin initialized successfully in production');
    return cachedMagicAdmin;
  } catch (error) {
    console.error('❌ Magic Admin initialization failed in production:', error);
    throw new Error('Authentication service is temporarily unavailable. Please try again in a moment.');
  }
}