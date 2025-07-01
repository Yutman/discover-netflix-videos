import { magicAdmin } from "../../lib/magic";
import { removeTokenCookie } from "../../lib/cookies";
import { verifyToken } from "../../lib/utils";

export default async function logout(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "User is not logged in" });
    }

    const userId = await verifyToken(token);
    if (!userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    removeTokenCookie(res);

    try {
      await magicAdmin.users.logoutByIssuer(userId);
    } catch (error) {
      // Log the error but do not send it to the client
      console.error("Error occurred while logging out Magic user:", error);
    }

    res.writeHead(302, { Location: "/login" });
    res.end();
  } catch (error) {
    console.error("Logout error:", error);
    res.status(401).json({ message: "User is not logged in" });
  }
}



