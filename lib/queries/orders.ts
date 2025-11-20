import { db } from "@/db";
import { orders, user } from "@/db/schema";
import { desc, eq, getTableColumns } from "drizzle-orm";

export type Order = typeof orders.$inferSelect & { userName: string | null };

export async function getOrders() {
  return await db
    .select({
      ...getTableColumns(orders),
      userName: user.name,
    })
    .from(orders)
    .leftJoin(user, eq(orders.userId, user.id))
    .orderBy(desc(orders.createdAt));
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
