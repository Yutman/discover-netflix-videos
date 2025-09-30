import {Magic} from '@magic-sdk/admin';

let cachedMagicAdmin = null;
let initializationAttempts = 0;
const MAX_RETRIES = 3;

export function getMagicAdmin() {
  if (cachedMagicAdmin) return cachedMagicAdmin;

  const serverKey = process.env.MAGIC_SERVER_KEY;
  
  if (!serverKey) {
    console.error('❌ Magic server key (MAGIC_SERVER_KEY) is missing');
    console.error('Available environment variables:', Object.keys(process.env).filter(key => key.includes('MAGIC')));
    throw new Error('Authentication service is temporarily unavailable. Please try again in a moment.');
  }

  try {
    // Add retry logic for Magic initialization
    if (initializationAttempts < MAX_RETRIES) {
      cachedMagicAdmin = new Magic(serverKey);
      initializationAttempts = 0; // Reset on success
      return cachedMagicAdmin;
    } else {
      throw new Error('Magic initialization failed after multiple attempts');
    }
  } catch (error) {
    initializationAttempts++;
    console.error(`Magic initialization attempt ${initializationAttempts} failed:`, error.message);
    
    if (initializationAttempts >= MAX_RETRIES) {
      console.error('❌ Magic initialization failed after maximum retries');
      throw new Error('Authentication service is temporarily unavailable. Please try again in a moment.');
    }
    
    // Retry after a short delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          cachedMagicAdmin = new Magic(serverKey);
          initializationAttempts = 0;
          resolve(cachedMagicAdmin);
        } catch (retryError) {
          reject(retryError);
        }
      }, 1000 * initializationAttempts); // Exponential backoff
    });
  }
}