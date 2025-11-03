import Image from "next/image";
interface CollectionContainerProps {
  title: string;
  images: string[]; 
}


export default function CollectionContainer({title,images }: CollectionContainerProps){
    return (
<div className="flex flex-row items-center gap-6 p-4 m-4 justify-center">

      {/* Title no forced width */}
      <h1 className="text-3xl font-bold text-blue-500 text-center">
        {title}
      </h1>

      {/* Grid that actually stays in one row */}
      <div className="grid grid-cols-4 gap-2">
        {images.slice(0, 4).map((image, i) => (
          <div
            key={i}
            className="relative w-[120px] aspect-square overflow-hidden rounded-md border-2 border-blue-500"
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
    );
}