import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export type Order = typeof orders.$inferSelect;

export async function getOrders() {
  return await db.select().from(orders).orderBy(desc(orders.createdAt));
}

export async function getOrdersByUserId(userId: string) {
  return await db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt));
}

export async function getOrderById(orderId: string) {
  const result = await db
    .select()
    .from(orders)
    .where(eq(orders.orderID, orderId));
  return result[0];
}
