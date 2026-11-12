import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const url = process.env.DATABASE_URL;

// drizzle() is only safe to call at request time when DATABASE_URL is set.
// Keep the import side-effect light so build-time pages that never touch
// the db do not fail on a missing env var.
export const db = url
  ? drizzle(neon(url))
  : (new Proxy(
      {},
      {
        get() {
          throw new Error("DATABASE_URL is not set");
        },
      }
    ) as ReturnType<typeof drizzle>);
