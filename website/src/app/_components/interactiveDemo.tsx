"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InformationCircleIcon,
  ArrowPathIcon,
  ChartBarIcon,
  ChartPieIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface DataPoint {
  date: string;
  followers: number;
  engagement: number;
  casts: number;
  likes: number;
  recasts: number;
}

const initialData: DataPoint[] = [
  {
    date: "2023-01-01",
    followers: 1000,
    engagement: 500,
    casts: 50,
    likes: 300,
    recasts: 100,
  },
  {
    date: "2023-02-01",
    followers: 1200,
    engagement: 600,
    casts: 60,
    likes: 350,
    recasts: 120,
  },
  {
    date: "2023-03-01",
    followers: 1500,
    engagement: 750,
    casts: 75,
    likes: 450,
    recasts: 150,
  },
  {
    date: "2023-04-01",
    followers: 1800,
    engagement: 900,
    casts: 90,
    likes: 540,
    recasts: 180,
  },
  {
    date: "2023-05-01",
    followers: 2200,
    engagement: 1100,
    casts: 110,
    likes: 660,
    recasts: 220,
  },
  {
    date: "2023-06-01",
    followers: 2700,
    engagement: 1350,
    casts: 135,
    likes: 810,
    recasts: 270,
  },
];

type Metric = "followers" | "engagement" | "casts" | "likes" | "recasts";
type ChartType = "area" | "bar" | "pie";

const metricInfo: Record<Metric, { label: string; color: string }> = {
  followers: { label: "Followers", color: "var(--color-primary)" },
  engagement: { label: "Engagement", color: "var(--color-secondary)" },
  casts: { label: "Casts", color: "var(--color-accent)" },
  likes: { label: "Likes", color: "var(--color-muted)" },
  recasts: { label: "Recasts", color: "var(--color-info)" },
};

export default function InteractiveDemo() {
  const [data, setData] = useState<DataPoint[]>(initialData);
  const [metrics, setMetrics] = useState<Metric[]>(["followers", "engagement"]);
  const [chartType, setChartType] = useState<ChartType>("area");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (chartRef.current && chartRef.current.contains(e.target as Node)) {
        e.preventDefault();
        window.scrollBy(0, e.deltaY);
      }
    };
    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  const updateData = () => {
    setIsAnimating(true);
    const newData: DataPoint[] = data.map((item) => ({
      ...item,
      followers: Math.floor(item.followers * (0.9 + Math.random() * 0.2)),
      engagement: Math.floor(item.engagement * (0.9 + Math.random() * 0.2)),
      casts: Math.floor(item.casts * (0.9 + Math.random() * 0.2)),
      likes: Math.floor(item.likes * (0.9 + Math.random() * 0.2)),
      recasts: Math.floor(item.recasts * (0.9 + Math.random() * 0.2)),
    }));
    setData(newData);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const getChartOptions = (): ApexCharts.ApexOptions => {
    const baseOptions: ApexCharts.ApexOptions = {
      chart: {
        height: 400,
        type: chartType,
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        type: "datetime",
        categories: data.map((d) => new Date(d.date).getTime()),
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (value) => value.toFixed(0),
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
      },
      colors: metrics.map((m) => metricInfo[m].color),
    };

    if (chartType === "area") {
      baseOptions.fill = {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      };
    }

    if (chartType === "pie") {
      baseOptions.labels = metrics.map((m) => metricInfo[m].label);
      baseOptions.responsive = [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ];
    } else {
      baseOptions.yaxis = metrics.map((metric, index) => ({
        title: {
          text: metricInfo[metric].label,
        },
        opposite: index % 2 !== 0,
      }));
    }

    return baseOptions;
  };

  const getSeries = () => {
    if (chartType === "pie") {
      return data[data.length - 1]
        ? metrics.map((m) => data[data.length - 1][m])
        : [];
    }
    return metrics.map((metric) => ({
      name: metricInfo[metric].label,
      data: data.map((d) => d[metric]),
    }));
  };

  return (
    <div className="bg-card text-card-foreground p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Channel Analytics Demo</h2>
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <div className="flex flex-wrap gap-2">
          <Select
            value={metrics.join(",")}
            onValueChange={(value) => setMetrics(value.split(",") as Metric[])}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Metrics" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(metricInfo).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setChartType("area")}
                  className={
                    chartType === "area"
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                >
                  <ChartBarIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Area Chart</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setChartType("bar")}
                  className={
                    chartType === "bar"
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                >
                  <ChartBarIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Bar Chart</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setChartType("pie")}
                  className={
                    chartType === "pie"
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                >
                  <ChartPieIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Pie Chart</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowTable(!showTable)}
                  className={
                    showTable ? "bg-primary text-primary-foreground" : ""
                  }
                >
                  <TableCellsIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle Data Table</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={updateData}
                disabled={isAnimating}
              >
                <ArrowPathIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Refresh Data</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="h-[400px]" ref={chartRef}>
        <Chart
          options={getChartOptions()}
          series={getSeries()}
          type={chartType}
          height="100%"
        />
      </div>
      <AnimatePresence>
        {showTable && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden"
          >
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left">Date</th>
                  {metrics.map((metric) => (
                    <th key={metric} className="text-left">
                      {metricInfo[metric].label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-muted" : ""}>
                    <td>{item.date}</td>
                    {metrics.map((metric) => (
                      <td key={metric}>{item[metric].toLocaleString()}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mt-4 text-sm text-muted-foreground">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex items-center">
              <InformationCircleIcon className="h-4 w-4 mr-1" />
              <span>About this demo</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                This interactive demo showcases sample channel analytics data.
                Select metrics to compare, choose different chart types, and
                toggle the data table view. Use the toolbar to zoom, pan, and
                download the chart.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
