"use client";

export default function StatsGrid({ items }) {

  return (
    <section className="dashboard-sec">
      <div className="stats-card-container">

        {items.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              className="admin-stats-card hover-effect border"
            >
              <div className="flex flex-col ml-2">
                <p className="font-semibold text-purple-300 text-sm">
                  {item.label}
                </p>

                <h3 className="text-xl text-white ">
                  {item.value}
                </h3>
              </div>

              <Icon size={40} className="Icon-stats" />
            </div>
          );
        })}

      </div>
    </section>
  );
}