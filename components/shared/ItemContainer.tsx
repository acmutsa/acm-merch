import Image from "next/image"

interface ItemContainerProps{
    imageURL: string,
    title: string,
}


export default function ItemContainer({ imageURL, title }: ItemContainerProps){
    return(
        <div
              className="relative w-[200px] aspect-square overflow-hidden rounded-md border-2 border-blue-500 transition-transform duration-200 hover:scale-105"
            >
              <Image
                src={imageURL}
                alt={`${title} preview `}
                fill
                className="object-cover"
              />
            </div>
    )
}