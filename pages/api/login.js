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
        return res.status(401).json({ done: false, error: "Missing DID token" });
      }

      const magicAdmin = getMagicAdmin();
      const metadata = await magicAdmin.users.getMetadataByToken(didToken);

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
      console.error("Something went wrong logging in", error);
      const message =
        error && typeof error.message === 'string' ? error.message : 'Unknown error';
      const status = message.includes('MAGIC_SERVER_KEY') ? 500 : 401;
      res.status(status).send({ done: false, error: message });
    }
  } else {
    res.status(405).send({ done: false });
  }
}