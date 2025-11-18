import { productMappings } from "@/db/schema";
import { stripe } from "../stripe";
import { ProductSyncSchema } from "../validation/productMapping";
import { db } from "@/db";
import { eq } from "drizzle-orm";

    export async function syncVariantToStripe(input: unknown) {
            const{ printfulProductId, printfulVariantId, retailPrice} = ProductSyncSchema.parse(input)

            const existing = await db.query.productMappings.findFirst({
                where: eq(productMappings.printfulVariantID,printfulVariantId)
            });
            if (existing) {
                return existing.stripePriceID;
            }         
            const product = await stripe.products.create({
                name:`Printful Variant ${printfulVariantId}`,
                metadata:{
                    printfulProductId,
                    printfulVariantId,
                }
            });
            const unitAmount = Math.round(parseFloat(retailPrice) * 100);

            const price = await stripe.prices.create({
                product: product.id,
                currency: 'usd',
                unit_amount: unitAmount,
            });

              await db.insert(productMappings).values({
                printfulProductID: printfulProductId,
                printfulVariantID: printfulVariantId,
                stripeProdID: product.id,
                stripePriceID: price.id,
            });

            return price.id;
    }

