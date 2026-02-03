import  transporter  from "@/utils/NodeMailer";
import { NextResponse } from "next/server";

export async function GET() {
    
    await transporter.sendMail({

    from: "220170116002@vgecg.ac.in",
    to: "bhavy1921@gmail.com", // send to yourself
    subject: "Next.js Local Test ",
    html: "<h3>Nodemailer works in Next.js 🎉</h3>"
    });

    // console.log("reply",reply);

    return NextResponse.json({ message: "Email sent" });
}