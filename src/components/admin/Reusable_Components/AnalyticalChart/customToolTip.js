"use client";


export default function CustomToolTip ({ active, payload, label, unit}) {

     if (active && payload && payload.length) {

         return (

        <main className="customToolTipContainer">

            <p className="ToolTipLabel text-gray-700">{label}</p>

            <p className="text-xl font-bold"> {payload[0].value.toLocaleString()}
          <span className="text-xs ml-1 text-white">{unit}</span></p>

        </main>
    )


     }
   
}