import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
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
      <header> 
        CollectionID: {collectionID} 
      </header>
      <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
    </>
    );
  }
  