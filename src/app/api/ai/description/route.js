// import { NextResponse } from "next/server";

// export async function POST(req) {

//     try {

//         const {specs} = await req.json();

//         if(!specs) {

//             return NextResponse.json(

//                 {error:"Specs required"},
//                 {status:400}
//             );
//         }

//         const prompt = `
        
//         Genrate a short e-commerce style laptop description (20-25) words.
        
//         Specs:
// Processor: ${specs.processor}
// RAM: ${specs.ram}
// Storage: ${specs.storage}

// Write a natural product description suitable for an online store.`
//     }
// }