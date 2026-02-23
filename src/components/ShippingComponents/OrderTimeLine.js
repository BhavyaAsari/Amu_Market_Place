import {
  LuCircleCheck,
  LuSettings,
  LuTruck,
  LuPackageCheck,
} from "react-icons/lu";

export default function OrderTimeLine({ status = "placed",orderNumber, createdAt  }) {
  const steps = [
    {
      key: "placed",
      label: "Order Placed",
      icon: LuCircleCheck,
    },
    {
      key: "processing",
      label: "Processing",
      icon: LuSettings,
    },
    {
      key: "shipped",
      label: "Shipped",
      icon: LuTruck,
    },
    {
      key: "delivered",
      label: "Delivered",
      icon: LuPackageCheck,
    },
  ];

    const formattedDate = new Date(createdAt).toLocaleString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const currentStepIndex = steps.findIndex((step) => step.key === status);

  return (
    <div className="TimeLineMain">
      {/* Title OUTSIDE relative wrapper */}

    <div className="orderCardHeader">


  <div>
    <h2 className="orderCardTitle">
      Order #{orderNumber}
    </h2>

    <p className="orderCardSubtitle">
      Thank you for your purchase! Your order was placed on 
      <span className="font-medium text-gray-700"> {formattedDate}</span>.
    </p>
  </div>

</div>

      <div className="relative">
        {/* Background Line */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full" />

        {/* Active Progress Line */}
        <div
          className="absolute top-5 left-0 h-1 bg-purple-600 rounded-full transition-all duration-500"
          style={{
            width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
          }}
        />

        {/* Steps */}
        <div className="flex justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index < currentStepIndex;
            const isActive = index === currentStepIndex;

            return (
              <div key={step.key} className="flex flex-col items-center w-1/4">
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-full border-2 transition z-500
                    ${
                      isCompleted || isActive
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-white text-gray-400 border-gray-300"
                    }`}
                >
                  {isCompleted ? (
                    <LuCircleCheck size={40} />
                  ) : (
                    <Icon size={40} />
                  )}{" "}
                </div>

                <span
                  className={`mt-3 text-lg font-medium
                    ${isActive ? "text-purple-600" : "text-gray-500"}`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
