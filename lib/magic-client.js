import { Magic } from "magic-sdk";

const createMagic = () => {
  if (typeof window === "undefined") {
    console.log('🔍 Magic Client Debug - Server-side rendering, Magic not initialized');
    return null;
  }

  const publishableKey = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY;
  
  console.log('🔍 Magic Client Debug - Client-side initialization:');
  console.log('Publishable key exists:', !!publishableKey);
  console.log('Publishable key length:', publishableKey ? publishableKey.length : 0);
  console.log('Publishable key starts with pk_live_ or pk_test_:', publishableKey ? publishableKey.startsWith('pk_live_') || publishableKey.startsWith('pk_test_') : false);

  if (!publishableKey) {
    console.error('❌ Magic publishable key (NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY) is missing');
    return null;
  }

  console.log('✅ Magic client initialized successfully');
  return new Magic(publishableKey);
};

export const magic = createMagic();

