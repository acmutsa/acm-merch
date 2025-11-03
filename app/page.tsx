import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Hero from "@/components/landing/Hero";
import CollectionContainer from "@/components/shared/CollectionContainer";
export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <>
      <Hero params={{ text: "Welcome To The ACM Merch Store" ,image:"/assets/globe.jpeg"}} />
      <div className="flex flex-col items-center justify-center gap-12 py-12">
        <CollectionContainer
            title="RowdyHacks"
            images={[
              "/assets/logo.png",
              "/assets/logo.png",
              "/assets/logo.png",
              "/assets/logo.png"
            ]}
          />
          <CollectionContainer
            title="Datathon"
            images={[
              "/assets/logo.png",
              "/assets/logo.png",
              "/assets/logo.png",
              "/assets/logo.png"
            ]}
          />
          <CollectionContainer
            title="CodeQuantum"
            images={[
              "/assets/logo.png",
              "/assets/logo.png",
              "/assets/logo.png",
              "/assets/logo.png"
            ]}
          />
          <CollectionContainer
            title="RowdyCyberCon"
            images={[
              "/assets/logo.png",
              "/assets/logo.png",
              "/assets/logo.png",
              "/assets/logo.png"
            ]}
          />
        </div>
    </>
  );
}
