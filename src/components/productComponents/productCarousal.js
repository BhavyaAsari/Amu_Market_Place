"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function CartCarousel ({images,title}) {

    // console.log("images",images);
return (

        
<main className="h-24 ">
  <Carousel
  responsive={responsive}
  arrows
  infinite>
    {images.map((img, index) => (
      <div
        key={index}
        className=" w-32 h-52   sm:w-64 sm:h-72"
      >
        <Image
          src={img}
          alt={`${title} image ${index + 1}`}
          fill
          className="object-contain "
          priority={index === 0}
        />
      </div>
    ))}
  </Carousel>
</main>

);
}
