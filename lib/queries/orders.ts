import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc } from "drizzle-orm";

export type Order = typeof orders.$inferSelect;

export async function getOrders() {
  return await db.select().from(orders).orderBy(desc(orders.createdAt));
}
