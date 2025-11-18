import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const productMappings = sqliteTable("product_mappings",{
    id: integer("id").primaryKey({ autoIncrement: true }),
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

export * from "./auth-schema";
