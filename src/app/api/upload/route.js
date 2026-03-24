import {v2 as cloudinary } from "cloudinary";

cloudinary.config({

    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});


function clearString(str ="") {

    return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g,"-")
    .replace(/^-|-$/g,"");
}


export async function POST(req) {

    try {

        const formData = await req.formData();

        const file = formData.get("file");
        const brandRaw = formData.get("brand");
        const seriesRaw = formData.get("series");

        if(!file) {

            return Response.json(

                {success:false,message:"No file uploaded"},
                {status:400}
            );
        }

        //clean Values
        const brand = clearString(brandRaw || "others");
        const series = clearString(seriesRaw || "general");

        //File -> Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        //Clean filename
        const originalName = clearString(file?.name?.split(".")[0] || "image");

        return await new Promise((resolve,reject) => {

            cloudinary.uploader
            .upload_stream(
                {

                    folder:`products/laptops/${brand}/${series}`,
                    public_id:originalName,
                    overwrite:true,
                },
                (err,result) => {

                    if(err) {

                        console.error(err);
                        return reject(

                            Response.json({

                                success:false,
                                message:"Upload Failed",
                            })
                        );
                    }

                    resolve(

                        Response.json({

                            success:true,
                            url:result.secure_url,
                        })
                    );
                }
            )
            .end(buffer);
        });
    } catch (error) {

        console.error(error);
        return Response.json(

            {success:false,message:"Server error"},
            {status:500}
        );
    }
}
