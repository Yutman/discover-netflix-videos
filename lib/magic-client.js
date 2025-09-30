import { Magic } from "magic-sdk";

const createMagic = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const publishableKey = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY;
  
  if (!publishableKey) {
    console.error('Magic publishable key is missing');
    return null;
  }

  try {
    return new Magic(publishableKey);
  } catch (error) {
    console.error('Magic client initialization failed:', error);
    return null;
  }
};

export const magic = createMagic();

