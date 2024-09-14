import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { ApexOptions } from "apexcharts";

interface ChartProps {
  data: { [key: string]: string | number }[];
  xKey: string;
  yKey: string;
  title: string;
}

export const LineChart: React.FC<ChartProps> = ({
  data,
  xKey,
  yKey,
  title,
}) => {
  const series = [
    {
      name: title,
      data: data.map((item) => Number(item[yKey])),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "line",
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    title: { text: title, align: "left" },
    grid: {
      borderColor: "var(--chart-grid)",
      row: { colors: ["transparent", "transparent"], opacity: 0.5 },
    },
    xaxis: { categories: data.map((item) => String(item[xKey])) },
    yaxis: { title: { text: yKey } },
    theme: { mode: "light", palette: "palette1" },
    tooltip: { theme: "light" },
  };

  return <Chart options={options} series={series} type="line" height={350} />;
};

export const BarChart: React.FC<ChartProps> = ({ data, xKey, yKey, title }) => {
  const series = [
    {
      name: title,
      data: data.map((item) => Number(item[yKey])),
    },
  ];

  const options: ApexOptions = {
    chart: { type: "bar" },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        // endingShape: "rounded" as const,
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    title: { text: title, align: "left" },
    xaxis: { categories: data.map((item) => String(item[xKey])) },
    yaxis: { title: { text: yKey } },
    fill: { opacity: 1 },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " " + yKey;
        },
      },
    },
    theme: { mode: "light", palette: "palette1" },
  };

  return <Chart options={options} series={series} type="bar" height={350} />;
};

interface PieChartProps {
  data: { type: string; percentage: number }[];
  title: string;
}

export const PieChart: React.FC<PieChartProps> = ({ data, title }) => {
  const series = data.map((item) => item.percentage);
  const labels = data.map((item) => item.type);

  const options: ApexOptions = {
    chart: { type: "pie" },
    labels: labels,
    title: { text: title, align: "left" },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 200 },
          legend: { position: "bottom" },
        },
      },
    ],
    theme: { mode: "light", palette: "palette1" },
  };

  return <Chart options={options} series={series} type="pie" height={350} />;
};
