import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import cloudinary from "./cloudinary.js";

dotenv.config();

const Base_Dir = path.join(process.cwd(),"public/products");

async function uploadImages(localPath,cloudinaryPath) {


    const items = fs.readdirSync(localPath);

    for(const item of items ) {

        const fullPath  = path.join(localPath,item);

        if(fs.lstatSync(fullPath).isDirectory()) {

            await uploadImages(

                fullPath,
                `${cloudinaryPath}/${item}`
           );
    } else {

        if(item==="default.png") continue;

        const publicId  = path.parse(item).name;

        const result = await cloudinary.uploader.upload(fullPath,{

            folder:cloudinaryPath,
            public_id:publicId,
            overwrite:true,
        });

        console.log("Uploaded:", result.secure_url);
    }
 } 

}

(async () => {

    try {

        await uploadImages(Base_Dir,"products/laptops");
        console.log("All images uploaded successfully.");


    } catch(err) {

        console.error("Upload error:",err);


    }
})();