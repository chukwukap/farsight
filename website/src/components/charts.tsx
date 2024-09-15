import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { ApexOptions } from "apexcharts";
import { useTheme } from "next-themes";

interface ChartProps {
  data: { [key: string]: string | number }[];
  xKey: string;
  yKey: string;
  title: string;
}

const useChartTheme = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return {
    background: isDark
      ? "hsl(var(--chart-background))"
      : "hsl(var(--chart-background))",
    text: isDark ? "hsl(var(--chart-text))" : "hsl(var(--chart-text))",
    grid: isDark ? "hsl(var(--chart-grid))" : "hsl(var(--chart-grid))",
    primary: "hsl(var(--chart-primary))",
    secondary: "hsl(var(--chart-secondary))",
    tertiary: "hsl(var(--chart-tertiary))",
    quaternary: "hsl(var(--chart-quaternary))",
    quinary: "hsl(var(--chart-quinary))",
    success: "hsl(var(--chart-success))",
    warning: "hsl(var(--chart-warning))",
    danger: "hsl(var(--chart-danger))",
    info: "hsl(var(--chart-info))",
    neutral: "hsl(var(--chart-neutral))",
  };
};

export const LineChart: React.FC<ChartProps> = ({
  data,
  xKey,
  yKey,
  title,
}) => {
  const chartTheme = useChartTheme();

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
      background: chartTheme.background,
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2, colors: [chartTheme.primary] },
    title: { text: title, align: "left", style: { color: chartTheme.text } },
    grid: {
      borderColor: chartTheme.grid,
      row: { colors: ["transparent", "transparent"], opacity: 0.5 },
    },
    xaxis: {
      categories: data.map((item) => String(item[xKey])),
      labels: { style: { colors: chartTheme.text } },
    },
    yaxis: {
      title: { text: yKey, style: { color: chartTheme.text } },
      labels: { style: { colors: chartTheme.text } },
    },
    theme: { mode: chartTheme.background === "dark" ? "dark" : "light" },
    tooltip: { theme: chartTheme.background === "dark" ? "dark" : "light" },
  };

  return <Chart options={options} series={series} type="line" height={350} />;
};

export const BarChart: React.FC<ChartProps> = ({ data, xKey, yKey, title }) => {
  const chartTheme = useChartTheme();

  const series = [
    {
      name: title,
      data: data.map((item) => Number(item[yKey])),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "bar",
      background: chartTheme.background,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    title: { text: title, align: "left", style: { color: chartTheme.text } },
    xaxis: {
      categories: data.map((item) => String(item[xKey])),
      labels: { style: { colors: chartTheme.text } },
    },
    yaxis: {
      title: { text: yKey, style: { color: chartTheme.text } },
      labels: { style: { colors: chartTheme.text } },
    },
    fill: { opacity: 1, colors: [chartTheme.primary] },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " " + yKey;
        },
      },
      theme: chartTheme.background === "dark" ? "dark" : "light",
    },
    theme: { mode: chartTheme.background === "dark" ? "dark" : "light" },
  };

  return <Chart options={options} series={series} type="bar" height={350} />;
};

interface PieChartProps {
  data: { type: string; percentage: number }[];
  title: string;
}

export const PieChart: React.FC<PieChartProps> = ({ data, title }) => {
  const chartTheme = useChartTheme();

  const series = data.map((item) => item.percentage);
  const labels = data.map((item) => item.type);

  const options: ApexOptions = {
    chart: {
      type: "pie",
      background: chartTheme.background,
    },
    labels: labels,
    title: { text: title, align: "left", style: { color: chartTheme.text } },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 200 },
          legend: { position: "bottom" },
        },
      },
    ],
    theme: { mode: chartTheme.background === "dark" ? "dark" : "light" },
    colors: [
      chartTheme.primary,
      chartTheme.secondary,
      chartTheme.tertiary,
      chartTheme.quaternary,
      chartTheme.quinary,
    ],
    legend: {
      labels: {
        colors: chartTheme.text,
      },
    },
  };

  return <Chart options={options} series={series} type="pie" height={350} />;
};
