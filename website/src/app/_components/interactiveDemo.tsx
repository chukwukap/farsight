"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as d3 from "d3";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  InformationCircleIcon,
  ArrowPathIcon,
  ChartBarIcon,
  UserGroupIcon,
  ChatBubbleLeftIcon,
  ChatBubbleLeftRightIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon,
  AtSymbolIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

interface DataPoint {
  name: string;
  followers: number;
  engagement: number;
  casts: number;
  replies: number;
  recasts: number;
  likes: number;
  mentions: number;
  newFollowers: number;
}

const initialData: DataPoint[] = [
  {
    name: "Jan",
    followers: 4000,
    engagement: 2400,
    casts: 150,
    replies: 80,
    recasts: 60,
    likes: 2000,
    mentions: 30,
    newFollowers: 200,
  },
  {
    name: "Feb",
    followers: 4200,
    engagement: 2600,
    casts: 180,
    replies: 100,
    recasts: 75,
    likes: 2200,
    mentions: 40,
    newFollowers: 220,
  },
  {
    name: "Mar",
    followers: 4500,
    engagement: 3000,
    casts: 200,
    replies: 120,
    recasts: 90,
    likes: 2500,
    mentions: 50,
    newFollowers: 300,
  },
  {
    name: "Apr",
    followers: 4800,
    engagement: 3300,
    casts: 220,
    replies: 140,
    recasts: 100,
    likes: 2800,
    mentions: 60,
    newFollowers: 320,
  },
  {
    name: "May",
    followers: 5200,
    engagement: 3700,
    casts: 250,
    replies: 160,
    recasts: 120,
    likes: 3200,
    mentions: 70,
    newFollowers: 400,
  },
  {
    name: "Jun",
    followers: 5600,
    engagement: 4100,
    casts: 280,
    replies: 180,
    recasts: 140,
    likes: 3600,
    mentions: 80,
    newFollowers: 450,
  },
];

type Metric =
  | "followers"
  | "engagement"
  | "casts"
  | "replies"
  | "recasts"
  | "likes"
  | "mentions"
  | "newFollowers";

const metricInfo = {
  followers: {
    icon: UserGroupIcon,
    label: "Followers",
    description: "Total number of followers",
    color: "#3A86FF",
  },
  engagement: {
    icon: ChartBarIcon,
    label: "Engagement",
    description: "Overall engagement rate",
    color: "#FF006E",
  },
  casts: {
    icon: ChatBubbleLeftIcon,
    label: "Casts",
    description: "Number of posts created",
    color: "#FB5607",
  },
  replies: {
    icon: ChatBubbleLeftRightIcon,
    label: "Replies",
    description: "Number of replies to your casts",
    color: "#FFBE0B",
  },
  recasts: {
    icon: ArrowPathRoundedSquareIcon,
    label: "Recasts",
    description: "Number of times your casts were reposted",
    color: "#8338EC",
  },
  likes: {
    icon: HeartIcon,
    label: "Likes",
    description: "Number of likes received",
    color: "#FF006E",
  },
  mentions: {
    icon: AtSymbolIcon,
    label: "Mentions",
    description: "Number of times you were mentioned",
    color: "#3A86FF",
  },
  newFollowers: {
    icon: UserPlusIcon,
    label: "New Followers",
    description: "Number of new followers gained",
    color: "#06D6A0",
  },
};

export default function InteractiveDemo() {
  const [data, setData] = useState<DataPoint[]>(initialData);
  const [activeMetric, setActiveMetric] = useState<Metric>("followers");
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const updateData = () => {
    setIsAnimating(true);
    const newData: DataPoint[] = data.map((item) => ({
      ...item,
      followers: Math.floor(Math.random() * 10000),
      engagement: Math.floor(Math.random() * 20000),
      casts: Math.floor(Math.random() * 500),
      replies: Math.floor(Math.random() * 300),
      recasts: Math.floor(Math.random() * 200),
      likes: Math.floor(Math.random() * 5000),
      mentions: Math.floor(Math.random() * 100),
      newFollowers: Math.floor(Math.random() * 1000),
    }));
    setData(newData);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = { top: 20, right: 30, bottom: 30, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg.selectAll("*").remove();

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, innerWidth])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d[activeMetric]) || 0])
      .nice()
      .range([innerHeight, 0]);

    const xAxis = (g: d3.Selection<SVGGElement, unknown, null, undefined>) =>
      g
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x))
        .call((g) => g.select(".domain").remove());

    const yAxis = (g: d3.Selection<SVGGElement, unknown, null, undefined>) =>
      g
        .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format("~s")))
        .call((g) => g.select(".domain").remove())
        .call((g) =>
          g
            .selectAll(".tick line")
            .clone()
            .attr("x2", innerWidth)
            .attr("stroke-opacity", 0.1)
        );

    const line = d3
      .line<DataPoint>()
      .x((d) => (x(d.name) || 0) + x.bandwidth() / 2)
      .y((d) => y(d[activeMetric]));

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g").call(xAxis);
    g.append("g").call(yAxis);

    const path = g
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", metricInfo[activeMetric].color)
      .attr("stroke-width", 3)
      .attr("d", line);

    const length = path.node()?.getTotalLength() || 0;

    path
      .attr("stroke-dasharray", `${length} ${length}`)
      .attr("stroke-dashoffset", length)
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);

    const dots = g
      .selectAll(".dot")
      .data(data)
      .join("circle")
      .attr("class", "dot")
      .attr("cx", (d) => (x(d.name) || 0) + x.bandwidth() / 2)
      .attr("cy", (d) => y(d[activeMetric]))
      .attr("r", 0)
      .attr("fill", metricInfo[activeMetric].color)
      .on("mouseover", (event, d) => setHoveredPoint(d))
      .on("mouseout", () => setHoveredPoint(null));

    dots
      .transition()
      .delay((_, i) => i * 150)
      .duration(500)
      .attr("r", 6);

    const area = d3
      .area<DataPoint>()
      .x((d) => (x(d.name) || 0) + x.bandwidth() / 2)
      .y0(innerHeight)
      .y1((d) => y(d[activeMetric]));

    g.append("path")
      .datum(data)
      .attr("fill", `${metricInfo[activeMetric].color}20`)
      .attr("d", area);

    // Add labels
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - innerHeight / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(metricInfo[activeMetric].label);

    g.append("text")
      .attr(
        "transform",
        `translate(${innerWidth / 2}, ${innerHeight + margin.top + 20})`
      )
      .style("text-anchor", "middle")
      .text("Months");
  }, [data, activeMetric]);

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-center mb-6">
            Interactive Analytics Demo
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the power of FarSight&apos;s analytics. This interactive
            demo showcases how you can visualize and analyze your Farcaster data
            to gain valuable insights.
          </p>
        </motion.div>
        <motion.div
          className="bg-card p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {Object.entries(metricInfo).map(
              ([key, { icon: Icon, label, description }]) => (
                <TooltipProvider key={key}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => setActiveMetric(key as Metric)}
                        variant={activeMetric === key ? "default" : "outline"}
                        className="w-full flex items-center justify-center"
                      >
                        <Icon className="w-5 h-5 mr-2" />
                        <span className="hidden sm:inline">{label}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            )}
          </div>
          <div className="flex justify-end mb-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={updateData}
                    variant="outline"
                    size="icon"
                    disabled={isAnimating}
                  >
                    <ArrowPathIcon
                      className={`h-4 w-4 ${isAnimating ? "animate-spin" : ""}`}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Randomize data to simulate different scenarios</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="w-full h-[400px] md:h-[500px] lg:h-[600px]">
            <svg
              ref={svgRef}
              width="100%"
              height="100%"
              className="max-w-full"
            ></svg>
            <AnimatePresence>
              {hoveredPoint && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-0 left-0 bg-background border border-border p-4 rounded shadow-lg max-w-[250px] z-10"
                  style={{
                    transform: `translate(${
                      ((svgRef.current?.getBoundingClientRect().width || 0) /
                        data.length) *
                      data.indexOf(hoveredPoint)
                    }px, 20px)`,
                  }}
                >
                  <h4 className="font-semibold text-lg mb-2">
                    {hoveredPoint.name}
                  </h4>
                  {Object.entries(metricInfo).map(([key, { label }]) => (
                    <p key={key} className="flex justify-between text-sm">
                      <span className="font-medium">{label}:</span>
                      <span className="ml-2">
                        {hoveredPoint[key as keyof DataPoint].toLocaleString()}
                      </span>
                    </p>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        <motion.div
          className="mt-8 bg-card p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <InformationCircleIcon className="w-6 h-6 mr-2 text-primary" />
            Understanding the Metrics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(metricInfo).map(
              ([key, { icon: Icon, label, description }]) => (
                <div
                  key={key}
                  className="flex flex-col items-center text-center p-4 bg-background rounded-lg shadow"
                >
                  <Icon className="w-8 h-8 text-primary mb-2" />
                  <h4 className="text-lg font-semibold mb-1">{label}</h4>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
