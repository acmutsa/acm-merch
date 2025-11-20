import { integer, sqliteTable, text,blob } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";


export const productMappings = sqliteTable("product_mappings",{
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull().default("Unknown Product"),
    printfulProductID: text("printful_product_id").notNull(),
    printfulVariantID: text("printful_variant_id").notNull(),

    stripeProdID: text("stripe_product_id").notNull(),
    stripePriceID: text("stripe_price_id").notNull(),

    createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),

  updatedAt: text("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
});

// userid and a json object of the orderid and the items
export const orders = sqliteTable("order_table",{
  id: integer("id").primaryKey({ autoIncrement: true }),
  orderID: text("order_id").notNull(),
  userId:  text("account_id").notNull(),
  cart: blob({ mode: 'json'}).$type<any>().notNull(),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  totalAmount:text("total_amount").notNull(),

});
export * from "./auth-schema";
