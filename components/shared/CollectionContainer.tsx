import Image from "next/image";
interface CollectionContainerProps {
  title: string;
  images: string[]; 
}


export default function CollectionContainer({title,images }: CollectionContainerProps){
    return (
<div className="flex  items-center gap-8 py-6 m-4 justify-center">


      <h1 className="text-5xl font-bold text-blue-500  flex-none">
        {title}
      </h1>

      <div className="flex-grow flex justify-end">
        <div className="grid grid-cols-4 gap-3">
          {images.slice(0, 4).map((image, i) => (
            <div
              key={i}
              className="relative w-[200px] aspect-square overflow-hidden rounded-md border-2 border-blue-500 transition-transform duration-200 hover:scale-105"
            >
              <Image
                src={image}
                alt={`${title} preview ${i}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

    </div>
    );
}