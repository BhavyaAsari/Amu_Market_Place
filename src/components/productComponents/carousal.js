"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./productCard";
export default function ProductCarousal() {

    const responsive = {

        desktop :{

            breakpoint :{max:3000,min:1024},
            items:5,  
        },
        tablet: {

            breakpoint :{max:1024,min:464},
            items:3,
        },
        mobile :{

            breakpoint: {max:464,min:0},
            items:1,
        },

    };

    const products = [

  {
    id: "lenovo-idea-tab",
    title: "Idea Tab",
    price: "₹17,999",
    image: "/idea.png",
    description:
      "MediaTek Octa-Core • Up to 8 GB RAM • 11″ 2.5K Display • Long-lasting Battery",
  },
  {
    id: "lenovo-thinkbook-14",
    title: "ThinkBook",
    price: "₹69,999",
    image: "/thinkbook.png",
    description:
      "Intel Core i5/i7 • 8–16 GB RAM • 14″ FHD Display • SSD Storage • Long Battery Life",
  },
  {
    id: "lenovo-yoga-tab-11",
    title: "Yoga Tab",
    price: "₹29,999",
    image: "/yoga.png",
    description:
      "Mid-range Processor • 4–8 GB RAM • Large Display • Long Battery • Built-in Kickstand",
  },
  {
    id: "lenovo-idea-slim-5",
    title: "Idea Slim 5",
    price: "₹74,999",
    image: "/slim.png",
    description:
      "Intel/AMD Processor • 8–16 GB RAM • 14″ FHD Display • SSD Storage • Long Battery Life",
  },
  {
    id: "lenovo-loq-gen10",
    title: "Lenovo LOQ Gen10",
    price: "₹79,991",
    image: "/loq.png",
    description:
      "AMD/Intel CPU • 8–16 GB RAM • 15.6″ FHD High-Refresh Display • SSD • Gaming Performance",
  },
];

    

    return (

        <>
        <Carousel responsive={responsive} arrows 
         keyBoardControl
         removeArrowOnDeviceType={["tablet", "mobile","desktop"]}
         autoPlay
         autoPlaySpeed={3000}
         infinite
         itemClass="px-2 "
          showDots={false}
          pauseOnHover={true}
           transitionDuration={500}
           customTransition="all .5"
           
         >

            {products.map((product) => (

                <ProductCard
                 key={product.id}
                 id={product.id} 
                 title={product.title}
                 price={product.price}
                 image={product.image}
                 description={product.description}
                 />
            ))}
        

         </Carousel>
        
        </>
    );
}