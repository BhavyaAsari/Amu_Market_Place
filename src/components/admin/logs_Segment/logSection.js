import LocalDropDown from "@/components/productComponents/localDropDown";
import SearchBarAdmin from "../Reusable_Components/SearchBarAdmin";
import AdminCard from "../adminCard";

export default function LogSystemMain({dbLogs}) {
//   const logs = [
//     {
//       id: 1,
//       type: "order",
//       action: "Updated order status",
//       entityId: "ORD-4821",
//       user: "Riya Shah",
//       time: "10:32 AM",
//       date: "today",
//       changes: { from: "processing", to: "shipped" },
//     },
//     {
//       id: 2,
//       type: "order",
//       action: "Updated payment status",
//       entityId: "ORD-4819",
//       user: "Riya Shah",
//       time: "10:18 AM",
//       date: "today",
//       changes: { from: "pending", to: "paid" },
//     },
//     {
//       id: 3,
//       type: "user",
//       action: "Toggled user status",
//       entityId: "UID-2291",
//       user: "Dev Patel",
//       time: "9:54 AM",
//       date: "today",
//       changes: { from: "active", to: "blocked" },
//     },
//     {
//       id: 4,
//       type: "product",
//       action: "Updated product details",
//       entityId: "SKU-0041",
//       user: "Dev Patel",
//       time: "9:30 AM",
//       date: "today",
//       changes: { from: "999", to: "899" },
//     },
//     {
//       id: 5,
//       type: "order",
//       action: "Updated order status",
//       entityId: "ORD-4790",
//       user: "Riya Shah",
//       time: "3:47 PM",
//       date: "yesterday",
//       changes: { from: "pending", to: "processing" },
//     },
//   ];

  const auditLogs = formatLogs(dbLogs);

  console.log("Db Logs",dbLogs);

  const groupedLogs = {
    today: auditLogs.filter((log) => log.date === "today"),
    yesterday: auditLogs.filter((log) => log.date === "yesterday"),
  };

function getValue(val) {
  if (typeof val === "object" && val !== null) {
    return Object.values(val)[0]; // extract value
  }
  return val;
}
  function formatLogs(logs) {

    if (!logs) return [];
    return logs.map((log) => {

          

        const dateObj = new Date(log.createdAt);
        const today = new Date();

        const isToday =
      dateObj.getDate() === today.getDate() &&
      dateObj.getMonth() === today.getMonth() &&
      dateObj.getFullYear() === today.getFullYear();

      return {
      id: log._id,
      type: log.module,
      action: log.action,
      entityId: log.targetId,
      user: log.adminName,
      time: dateObj.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: isToday ? "today" : "yesterday",
      changes: {
       from: getValue(log.changes?.before), 
        to: getValue(log.changes?.after),   
      },
    };
    })
  }

  return (
    <main>
      <div className="flex gap-4">
        <LocalDropDown />
        <SearchBarAdmin />
      </div>
      <section className="relative mt-6">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-black/20"></div>

        <p className="capitalize pl-10 text-sm text-purple-600 mb-4"> Today</p>

        {groupedLogs.today.map((log) => (
          <div key={log.id} className="grid grid-cols-[40px_1fr] gap-4 mb-6">
            <div className="flex justify-center">
              <div className="w-3 h-3 bg-pink-400 rounded-full mt-2"></div>
            </div>

            <AdminCard>
              <div>
                <p className="font-medium">
                  {log.action}
                  <span>{log.entityId}</span>
                </p>

                <p>by {log.user}</p>
                <div className="mt-2 flex gap-2 text-xs">
                  <span className="bg-gray-500/30 px-2 py-1 rounded">
                    {log.changes.from}
                  </span>
                  <span>→</span>
                  <span className="bg-green-500/30 px-2 py-1 rounded">
                    {log.changes.to}
                  </span>
                </div>
                <p className="text-xs text-purple-300 mt-2">{log.time}</p>
              </div>
            </AdminCard>
          </div>
        ))}

        <p className="capitalize pl-10 text-sm text-purple-600 mb-4">
          {" "}
          Yesterday
        </p>

        {groupedLogs.yesterday.map((log) => (
          <div key={log.id} className="grid grid-cols-[40px_1fr] gap-4 mb-6">
            <div className="flex justify-center">
              <div className="w-3 h-3 bg-pink-400 rounded-full mt-2"></div>
            </div>

            <AdminCard>
              <div>
                <p className="font-medium">
                  {log.action}
                  <span>{log.entityId}</span>
                </p>

                <p>by {log.user}</p>
                <div className="mt-2 flex gap-2 text-xs">
                  <span className="bg-gray-500/30 px-2 py-1 rounded">
                    {log.changes.from}
                  </span>
                  <span>→</span>
                  <span className="bg-green-500/30 px-2 py-1 rounded">
                    {log.changes.to}
                  </span>
                </div>
                <p className="text-xs text-purple-300 mt-2">{log.time}</p>
              </div>
            </AdminCard>
          </div>
        ))}
      </section>
    </main>
  );
}
