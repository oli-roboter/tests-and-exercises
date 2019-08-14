import React, { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import { getOrderStatus } from "../../data/data-function";

const PieChart = ({ filterStr }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const orderStatus = getOrderStatus(filterStr);
    const chartData = [
      {
        id: "Open orders",
        label: "Open",
        value: orderStatus.openOrders,
        color: "hsl(0, 72%, 61%)",
        legend: "white"
      },
      {
        id: "Closed orders",
        label: "closed",
        value: orderStatus.closedOrders,
        color: "#3f51b5",
        legend: "white"
      }
    ];

    setData(chartData);
  }, [filterStr]);

  return (
    <div style={{ height: "100px", width: "350px", margin: "1px" }}>
      <ResponsivePie
        data={data}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        sortByValue={true}
        colors={({ color }) => color}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        enableRadialLabels={false}
        isInteractive={false}
        slicesLabelsTextColor={({ legend }) => legend}
        legends={[
          {
            anchor: "left",
            direction: "column",
            // translateY: 56,
            itemWidth: 100,
            itemHeight: 25,
            itemTextColor: "#999",
            symbolSize: 18,
            symbolShape: "circle"
          }
        ]}
      />
    </div>
  );
};

export default PieChart;
