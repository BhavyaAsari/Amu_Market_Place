import Image from "next/image";

export default function Myorders({ orders }) {
  // console.log("orders", orders);

  if (!orders?.length)
    return (
      <>
        <div className="MyordersContainer">
          <section className="relative w-60 h-60">
            <Image
              src="/no_Orders.png"
              fill
              alt="no Orders"
              className="object-cover animate-pulse transition-all duration-500"
            />
          </section>
          <h2 className="text-3xl font-semibold">No Orders yet </h2>

          <p className="mt-6 text-lg text-gray-500">
            Looks like you haven’t placed any orders.
          </p>
        </div>
      </>
    );

 return (
  <div className="overflow-y-auto max-h-[65vh] pr-3 space-y-6">

    {orders.map((order) => (
      <div
        key={order._id}
        className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition duration-300"
      >
        {/* Top Section */}
        <div className="flex justify-between items-start">

          {/* Left */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {order.orderNumber}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Right */}
          <div className="text-right">
            <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700 font-medium">
             Satus: {order.paymentStatus || "Placed"}
            </span>

            <p className="mt-2 text-lg font-bold text-gray-800">
              ₹{order.total}
            </p>
          </div>
        </div>

        {/* Product Preview */}
        <div className="flex gap-4 mt-6">
          {order.items.slice(0, 4).map((item, index) => (
            <div
              key={index}
              className="w-36 h-36  relative  flex items-center justify-center"
            >
              <Image
                src={item.image}
                alt="Loading"
               fill
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-6 flex justify-end">
          <button className="text-sm font-medium text-purple-600 hover:underline transition">
            View Details →
          </button>
        </div>
      </div>
    ))}

  </div>
);
}
