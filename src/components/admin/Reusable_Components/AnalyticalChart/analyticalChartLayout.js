"use client";

import ChartGraph from "./Chartgraph";
import ChartHeader from "./chartHeader";
import StatsSection from "./statsSection";

export default function AnalyticalChartLayout({
  title,
  subtitle,
  statValue,
  statChange,
  totalValue,
  totalLabel,
  data,
  dataKey,
  unit,
}) {
  return (
    <div className="analyticalChartContainer">

      <ChartHeader title={title} subtitle={subtitle} />

      <StatsSection
        statValue={statValue}
        statChange={statChange}
        totalValue={totalValue}
        totalLabel={totalLabel}
      />

      <ChartGraph data={data} dataKey={dataKey} unit={unit} />

    </div>
  );
}