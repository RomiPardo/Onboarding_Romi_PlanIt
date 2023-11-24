import Image from "next/image";

type ImageCarruselProps = {
  images: string[];
};

const ImageCarrusel = ({ images }: ImageCarruselProps) => {
  return (
    <div className="flex w-full flex-row overflow-x-scroll">
      {images.length === 0 ? (
        <Image
          className="relative h-[275px] w-full sm:h-[400px] sm:rounded-md sm:opacity-100"
          src={"/service/example.png"}
          width="0"
          height="0"
          sizes="100%"
          alt="Imagen del servicio"
        />
      ) : (
        images.map((item, index) => (
          <div
            className="relative h-[275px] w-full shrink-0 sm:h-[400px]"
            key={index}
          >
            <Image
              className="object-cover sm:rounded-md sm:opacity-100"
              src={item}
              fill
              alt="Imagen del servicio"
            />
          </div>
        ))
      )}
    </div>
  );
};
export default ImageCarrusel;
