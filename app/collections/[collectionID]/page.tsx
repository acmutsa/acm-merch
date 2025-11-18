import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
export default async function Page({
    params,
  }: {
    params: Promise<{ collectionID: string }>;
  }) {
    const { collectionID } = await params;
  
    return (
      <>

      <h1 className="p-3 text-3xl font-bold text-center text-[#266ae8] capitalize">{collectionID}</h1>

      <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(16rem,1fr))] justify-center mx-auto max-w-7xl px-4 py-10">
        <Card className="hover:scale-105 transition-transform duration-200 w-72 h-80 border-[#266ae8]">
        <CardHeader>
            <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <img src="/assets/logo.png"/>
        </CardContent>
        </Card>

        <Card className="hover:scale-105 transition-transform duration-200 w-72 h-80 border-[#266ae8]">
        <CardHeader>
            <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <img src="/assets/logo.png"/>
        </CardContent>
        </Card>

        <Card className="hover:scale-105 transition-transform duration-200 w-72 h-80 border-[#266ae8]">
        <CardHeader>
            <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <img src="/assets/logo.png"/>
        </CardContent>
        </Card>

        <Card className="hover:scale-105 transition-transform duration-200 w-72 h-80 border-[#266ae8]">
        <CardHeader>
            <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <img src="/assets/logo.png"/>
        </CardContent>
        </Card>
     </div>
     
    </>
    );
  }
  