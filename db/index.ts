import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import * as betterAuthSchema from "./auth-schema";

config({ path: "../.env" });

export const db = drizzle({
  connection: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
  schema: { ...schema, ...betterAuthSchema },
});
