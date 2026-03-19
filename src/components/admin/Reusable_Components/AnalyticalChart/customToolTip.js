"use client";


export default function CustomToolTip ({ active, payload, label, unit}) {

     if (active && payload && payload.length) {

       const data = payload[0].payload;

    //  format full date
    const formattedDate = data?.date
      ? new Date(data.date).toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "short",
          year: "numeric"
        })
      : label;

         return (

        <main className="customToolTipContainer">

              <p className="ToolTipLabel text-gray-700 text-xs">
          {formattedDate}
        </p>
            <p className="text-xl font-bold"> {payload[0].value.toLocaleString()}
          <span className="text-xs ml-1 text-white">{unit}</span></p>

        </main>
    )


     }
   
}