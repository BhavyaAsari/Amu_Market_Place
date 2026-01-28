import { NextResponse } from "next/server";
import cloudinary from "@/libs/cloudinary";
import { getServerSession } from "next-auth";
import { Readable } from "stream";

// Removed unused imports: fs, path, assert, console

function bufferToStream(buffer) {

    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);
    return readable;
}

export async function POST(req) {

    try {

        // Authentication Check - FIXED: Added await keyword
        const session = await getServerSession()

        if(!session) {

            return NextResponse.json(

                {success:false,message:"Unauthorized"},
                {status:401}
        );
        }

        const formData = await req.formData();
        const file = formData.get("image");

        //Error checking file 
        if(!file) {

            return NextResponse.json(

                {success:false,message:"No image selected"},
                {status:400}
            );
        }

        //ValidateType
        const allowedTypes = ["image/jpeg","image/png","image/webp"];
        
        if(!allowedTypes.includes(file.type)) {

            return NextResponse.json(

                {success:false,message:"Invalid Image Type"},
                {status:400}
            );
        }

        //Validation of size
        if(file.size>3*1024*1024) {

            return NextResponse.json(
                {success:false,message:"Image must be under 3 MB"},
                {status:400}
            );
        }

        // convert to Buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Upload image to Cloudinary via stream
        const uploadResult = await new Promise((resolve, reject) => {

            const uploadStream = cloudinary.uploader.upload_stream(

                {
                    folder: "profiles",
                    resource_type: "image", // FIXED: was 'resoruce_type' (typo)
                },

                (error, result) => {

                    if (error) {
                        // FIXED: was 'rejects' - should be 'reject'
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );

            bufferToStream(buffer).pipe(uploadStream);
        });

        return NextResponse.json({

            success:true,
            url:uploadResult.secure_url,
        });


    } catch (error) {
        // FIXED: was 'Error' (capitalized) - should be 'error' (the actual variable)
        console.error("Cloudinary upload Error", error);
        return NextResponse.json(
            { success: false, message: "Image upload failed" },
            { status: 500 }
        );


    }
}