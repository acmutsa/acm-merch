// app/page.tsx
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Hero from "@/components/landing/Hero";
import CollectionContainer from "@/components/shared/CollectionContainer";
import { fetchProductById, resolvePrimaryImage } from "@/lib/printful";

type Item = { src: string; href?: string; alt?: string };

async function imagesFor(ids: number[]): Promise<Item[]> {
  const results = await Promise.allSettled(ids.map((id) => fetchProductById(id)));
  return results.map((r, idx) => {
    const id = ids[idx];
    const detail = r.status === "fulfilled" ? r.value : null;
    const src =
      (detail && resolvePrimaryImage(detail)) || "/assets/logo.png";
    const alt =
      (detail?.sync_product?.name as string) ??
      (detail?.name as string) ??
      `Product ${id}`;
    return { src, href: `/products/${id}`, alt };
  });
}

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });

  // TODO: replace with your real Printful product IDs
  const W_IDS = [403418551, 403418161, 403418074];
  const CIC_IDS = [403274159, 403273920, 403273329];
  const RH_IDS = [403269686, 403268663, 403266887];
  const OSS_IDS = [400586836, 402011001, 402030606];

  const [acmw, cic, rowdyhacks, projects] =
    await Promise.all([
      imagesFor(W_IDS),
      imagesFor(CIC_IDS),
      imagesFor(RH_IDS),
      imagesFor(OSS_IDS),
    ]);

  return (
    <>
      <Hero />
      <div className="flex flex-col justify-center gap-12 p-12">
        <CollectionContainer title="ACM-W" items={acmw} />
        <CollectionContainer title="Coding In Color" items={cic} />
        <CollectionContainer title="RowdyHacks" items={rowdyhacks} />
        <CollectionContainer title="Projects" items={projects} />
      </div>
    </>
  );
}
