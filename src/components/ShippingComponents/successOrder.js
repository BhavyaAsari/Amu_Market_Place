"use client";

import { LuCheck } from "react-icons/lu";
import OrderTimeLine from "./OrderTimeLine";
import CelebrationBurst from "./CelebrationBursrt";


export default function SuccessOrder({order}) {


    return (

        <>
        
        
      <main className="successComponentContainer">

 <section className="successSection">

  {/* Glow Layer */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.3),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.2),transparent_50%)] opacity-40" />

  <CelebrationBurst/>
  {/* Hero Content */}
  <div className="successHero">

    <div className="successIcon">
      <LuCheck size={74} />
    </div>

    <h1 className="successTitle">
      Order Successful!
    </h1>

    <p className="successSubtitle">
      Your order has been placed successfully. A confirmation email
    </p>

    <p className="successSubtitle">
       has been sent your email@exmpl.com .
    </p>

  </div>

  

  {/* Bottom Wave */}
  <div className="successWave">
    <svg
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className="successWaveSvg"
    >
     <path
  fill="#f9fafb"
  d="
    M0,0
    C360,40 540,160 720,180
    C900,160 1080,40 1440,0
    L1440,320
    L0,320
    Z
  "
/>
    </svg>
  </div>

</section>

<OrderTimeLine status="placed"  orderNumber={order.orderNumber}
        createdAt={order.createdAt}/>

</main>


        
        
        
        
        </>




    );
}