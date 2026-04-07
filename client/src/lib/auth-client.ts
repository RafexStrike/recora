import { createAuthClient } from "better-auth/react";

// For better-auth, the baseURL should be the server origin, not the /api suffix (because it defaults to adding /api/auth)
const serverOrigin = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(/\/api$/, "");

export const authClient = createAuthClient({
  baseURL: serverOrigin,
});
