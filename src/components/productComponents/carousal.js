"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./productCard";
export default function ProductCarousal({products}) {

    // console.log("products data",products);

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

    

    return (

        <>
        <Carousel responsive={responsive} arrows 
         keyBoardControl
         removeArrowOnDeviceType={["tablet", "mobile","desktop"]}
         autoPlay
         containerClass="relative"
         autoPlaySpeed={2000}
         infinite
         itemClass="px-5  py-7 "
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