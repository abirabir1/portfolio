import { profile } from "@/data/portfolio";

/**
 * URL publique du site : profile.siteUrl si renseignée, sinon l'URL fournie par Vercel,
 * sinon localhost en développement.
 */
export const siteUrl =
  profile.siteUrl ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
  "http://localhost:3000";
