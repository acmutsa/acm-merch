import { db } from "@/db";
import { user } from "@/db/schema";
import { desc } from "drizzle-orm";

export type User = typeof user.$inferSelect;

export async function getUsers() {
  return await db.select().from(user).orderBy(desc(user.createdAt));
}
