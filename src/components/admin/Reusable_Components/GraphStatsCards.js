"use client";

export default function StatsCardGraph({cards}) {

    return (

        <>
        <div className="graphStatsContainer">

        {cards.map((card,index) => (


 <div
 key={index}
 className="cardContainerMain">


    <p className="labelOfContainer">{card.label}</p>
    <p className="valueOfContainer"> {card.value}</p>
 </div>
        ))}

             
        </div>
        
        
        
        
        </>
    )
}