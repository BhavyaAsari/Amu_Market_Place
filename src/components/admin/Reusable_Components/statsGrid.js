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
              className="admin-stats-card hover-effect border border-white/10"
            >
              <div className="flex flex-col ml-2">
                <p className="font-bold text-purple-300 text-xs uppercase tracking-widest  textDropShadow">
                  {item.label}
                </p>
                <p className="text-xs font-semibold text-white">{item.subLabel}</p>

                <h3 className="text-3xl text-white font-semibold textDropShadow">
                  {item.value}
                </h3>
              </div>

              <div className="bg-white/10 rounded-xl p-3 ml-auto mr-3"> <Icon size={40} className="Icon-stats" /></div>
            </div>
          );
        })}

      </div>
    </section>
  );
}