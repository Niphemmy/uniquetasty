// Preflight: run before `next build` in production. Fails with a list of
// every missing item so NSBC knows exactly what the client still owes.

import { site } from "../src/data/site";
import { products } from "../src/data/catalog";
import { founder } from "../src/data/founder";

const isProd =
  process.env.VERCEL_ENV === "production" ||
  process.env.NODE_ENV === "production";

const problems: string[] = [];

if (isProd) {
  if (!site.nafdacNumber) problems.push("site.nafdacNumber is empty");

  for (const l of site.locations) {
    if (!l.street) problems.push(`location ${l.id}: street is empty`);
    if (!l.hours) problems.push(`location ${l.id}: hours are empty`);
  }

  for (const p of products) {
    if (p.ingredients.length === 0)
      problems.push(`product ${p.slug}: ingredients empty`);
    if (!p.taste) problems.push(`product ${p.slug}: taste copy empty`);
  }

  if (!founder.inHerWords.length)
    problems.push("founder.inHerWords is empty");

  for (const k of [
    "PAYSTACK_SECRET_KEY",
    "NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY",
    "DATABASE_URL",
    "NEXT_PUBLIC_SITE_URL",
    "OWNER_ALERT_EMAIL",
  ]) {
    if (!process.env[k]) problems.push(`env ${k} is missing`);
  }

  if (process.env.PAYSTACK_SECRET_KEY?.startsWith("sk_test"))
    problems.push("PAYSTACK_SECRET_KEY is a test key in production");
}

if (problems.length) {
  console.error("Preflight failed:\n- " + problems.join("\n- "));
  process.exit(1);
}

console.log("Preflight passed");
