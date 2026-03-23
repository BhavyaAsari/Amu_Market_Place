import EditProductForm from "@/components/admin/Product_Segment/editProductForm";
import EditUserForm from "@/components/admin/UserSegment/editUserForm";
import { connectDB } from "@/libs/db";
import Product from "@/models/Product";


export default async  function ProductEdit ({params}) {

    const {id} = await params;

    // console.log("id of product in admin ",id)

    await connectDB();

    const product = await Product.findById(id).lean();

    if(!product) {

        return <p>Product not found.</p>
    }

    return (

        <main>

            <p>Admin Product pages</p>

            <EditProductForm product = {JSON.parse(JSON.stringify(product))} />
        </main>
    );
}