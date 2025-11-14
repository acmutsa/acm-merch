interface heroPageProps {
  params: {
    text: string,
    image:string,
  };
}

export default function Hero({ params }: heroPageProps) {
  return (
    <div className="w-full flex justify-center">
      <div className="bg-blue-500 h-[50vh] w-full flex items-center justify-center"
      style={{
        backgroundImage: `url(${params.image})`,
      }}>
        <h1 className="text-white text-5xl font-bold">
         {params.text}
        </h1>
      </div>
    </div>
  );
}
