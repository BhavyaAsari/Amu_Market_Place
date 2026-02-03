import mongoose from "mongoose";

const specSchema = new mongoose.Schema ({

    processor: String,
    ram: String,
    storage: String,
    graphics: String,
    display: String,
    os: String,
    color: String,
    weight: String,
    battery: String,
    audio: String,
    security: String,
    connectivity: String,
},

{_id:false}
);

const productSchema = new mongoose .Schema (
    {

        id:{

            type:String,
            required:true,
            unique:true,
        },

        brand: {
            type: String,
            required: true,
            lowercase: true,
            index: true,
        },
        
        title:{

            type:String,
            required:true,
        },

        shortDescription:{

            type:String,
            required:true,
        },

        price:{

            type:Number,
            required:true,
        },

        rating:{

            type:Number,
            default:0,
        },

        image: {
        type: String, // main image
        required: true,
        },

        images: {
        type: [String], // gallery
        default: [],
        },

    specs: specSchema,

},
{   timestamps:true}

);


export default mongoose.models.Product || mongoose.model("Product",productSchema);