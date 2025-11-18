import { z } from "zod";

export const ProductSyncSchema = z.object({
    printfulProductId: z.string().min(1),
    printfulVariantId: z.string().min(1),
    retailPrice: z.string().min(1),
});

export type ProductSync = z.infer<typeof ProductSyncSchema>;