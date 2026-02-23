
import SuccessOrder from "@/components/ShippingComponents/successOrder";
import { getAllOrders } from "@/app/actions/productAction/getAllOrders";
import { connectDB } from "@/libs/db";
import Orders from "@/models/Orders";
export default async  function successPage({params}) {

    const { id } = await params; 

    await connectDB();

  const order = await Orders.findById(id).lean();

    console.log("orders",order);

     if (!order) {
    return <div>Order not found</div>;
  }

 const safeOrder = {
    orderNumber: order.orderNumber,
    createdAt: order.createdAt.toISOString(),
  };
return (
        <>


        <SuccessOrder order={safeOrder}/>        
        
        
        
        
        
        </>

);


}