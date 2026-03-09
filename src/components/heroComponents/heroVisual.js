import { LuTruck,LuShieldCheck,LuBot,LuTag} from "react-icons/lu"


export default function  HeroDecc() {






    return (

        <>
        
        <div className="flex  justify-center mt-4 ">

            <div className="hero-section">
               <div className="flex ">
                 <LuTruck size={30} className="ui-hero-icons" />
               <span className=" ui-hero-text "> Free Delivery</span>
               </div>
               <span className="ui-text">Enjoy all orders  with premium shipping</span>
            </div>
            <hr className="border "/>
            <div className="hero-section"> 
               <div className="flex ">
                 <LuTag size={30} className="ui-hero-icons"/>
                 <span className=" ui-hero-text">Best Prices</span>
               </div>
                 <span className="ui-text">Guaranteed Best offers & affordable Deals</span></div>
            <div className="hero-section">
               <div className="flex ">
                 <LuShieldCheck size={30} className="ui-hero-icons" />
            <span className=" ui-hero-text">Secured Checkout</span>
               </div>
            <span className="ui-text">100% Protection throughout the process</span>
            </div>
            <div className="hero-section">
                <div className="flex ">
                    <LuBot size={30} className="ui-hero-icons" />
                <span className=" ui-hero-text">AI Comparision</span>
                </div>
                <span className="ui-text">AI Powered recommnedations & Analysis</span></div>
        </div>
        
        
        </>
    )
}