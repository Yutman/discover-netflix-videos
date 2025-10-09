import { getMagicAdmin } from "../../lib/magic";
import jwt from "jsonwebtoken";
import { createNewUser, isNewUser } from "../../lib/db/hasura";
import { setTokenCookie } from "../../lib/cookies";

export default async function login(req, res) {
  if (req.method === "POST") {
    try {
      const auth = req.headers.authorization;
      const didToken = auth ? auth.substr(7) : "";

      if (!didToken) {
        return res.status(401).json({ 
          done: false, 
          error: "Authentication failed. Please try signing in again." 
        });
      }

      // Enhanced Magic Admin initialization with retry logic
      let magicAdmin;
      try {
        console.log('🔍 Attempting to initialize Magic Admin...');
        magicAdmin = await getMagicAdmin();
        console.log('✅ Magic Admin initialized successfully');
      } catch (magicError) {
        console.error("❌ Magic Admin initialization failed:", magicError);
        return res.status(503).json({ 
          done: false, 
          error: "Authentication service is temporarily unavailable. Please try again in a moment." 
        });
      }

      console.log('🔍 Attempting to verify DID token...');
      const metadata = await magicAdmin.users.getMetadataByToken(didToken);
      console.log('✅ DID token verified successfully:', { issuer: metadata.issuer, email: metadata.email });

      const token = jwt.sign(
        {
          ...metadata,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-default-role": "user",
            "x-hasura-user-id": `${metadata.issuer}`,
          },
        },
        process.env.JWT_SECRET
      );

      const isNewUserQuery = await isNewUser(token, metadata.issuer);
      if (isNewUserQuery) {
        await createNewUser(token, metadata);
      }
      setTokenCookie(token, res);
      res.send({ done: true });
    } catch (error) {
      console.error("Login error:", error);
      
      // Enhanced error detection for API limits and rate limiting
      let userMessage = "Something went wrong during sign in. Please try again.";
      let statusCode = 500;
      
      // Check for specific API limit errors
      if (error.message.includes('rate limit') || error.message.includes('too many requests')) {
        userMessage = "Too many sign-in attempts. Please wait a few minutes and try again.";
        statusCode = 429;
      } else if (error.message.includes('quota exceeded') || error.message.includes('limit exceeded')) {
        userMessage = "Service temporarily unavailable due to high demand. Please try again later.";
        statusCode = 503;
      } else if (error.message.includes('Authentication service is temporarily unavailable')) {
        userMessage = "Authentication service is temporarily unavailable. Please try again in a moment.";
        statusCode = 503;
      } else if (error.message.includes('X-Magic-API-Key')) {
        userMessage = "Authentication service is experiencing issues. Please try again.";
        statusCode = 503;
      } else if (error.message.includes('JWT_SECRET')) {
        userMessage = "Server configuration error. Please contact support.";
        statusCode = 500;
      } else if (error.message.includes('timeout') || error.message.includes('ETIMEDOUT')) {
        userMessage = "Request timed out. Please try again.";
        statusCode = 504;
      } else if (error.message.includes('network') || error.message.includes('ECONNREFUSED')) {
        userMessage = "Network error. Please check your connection and try again.";
        statusCode = 503;
      }
      
      // Log additional details for debugging
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        status: error.status,
        response: error.response?.data
      });
      
      res.status(statusCode).json({ 
        done: false, 
        error: userMessage 
      });
    }
  } else {
    res.status(405).json({ 
      done: false, 
      error: "Method not allowed" 
    });
  }
}