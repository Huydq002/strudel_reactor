import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default function Graph() {
  const [data, setData] = useState([]);
  const svgRef = useRef(null);
  const MAX_POINTS = 100;

  useEffect(() => {
    const handler = (e) => {
      const line = String(e.detail || "").trim();
      if (!line) return;

      const match = line.match(/gain:([0-9.]+)/);
      if (match) {
        const gain = parseFloat(match[1]);
        setData((prev) => {
          const next = [...prev, gain];
          if (next.length > MAX_POINTS) next.shift();
          return next;
        });
      }
    };

    window.addEventListener("d3Data", handler);
    return () => window.removeEventListener("d3Data", handler);
  }, []);

  // Draw graph
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const rect = svgRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    svg.selectAll("*").remove();

    if (data.length === 0) return;

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    const x = d3.scaleLinear().domain([0, data.length - 1]).range([0, w]);
    const y = d3.scaleLinear().domain([0, d3.max(data) || 1]).nice().range([h, 0]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Background under axes
    g.insert("rect", ":first-child")
      .attr("width", w)
      .attr("height", h)
      .attr("fill", "#f4f3ff")
      .attr("rx", 6);

    // Gradient
    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient")
      .attr("id", "gain-gradient")
      .attr("x1", "0%").attr("y1", "0%")
      .attr("x2", "0%").attr("y2", "100%");

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#3a57e8");
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#9d7bf2");

    // Line generator
    const line = d3.line()
      .x((_, i) => x(i))
      .y((d) => y(d))
      .curve(d3.curveCatmullRom.alpha(0.6));

    // X axis 
    g.append("g")
      .attr("transform", `translate(0,${h + 2})`)
      .call(d3.axisBottom(x).ticks(10));

    // Y axis
    g.append("g")
      .call(d3.axisLeft(y).ticks(5));

    // Line path
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "url(#gain-gradient)")
      .attr("stroke-width", 3)
      .attr("d", line);

    // Last point
    g.append("circle")
      .attr("r", 4)
      .attr("cx", x(data.length - 1))
      .attr("cy", y(data[data.length - 1]))
      .attr("fill", "#ff6b6b");

    // Label
    g.append("text")
      .text(`Gain: ${data[data.length - 1].toFixed(2)}`)
      .attr("x", 5)
      .attr("y", -6)
      .attr("font-weight", 700)
      .attr("fill", "#3a57e8");

  }, [data]);

  return (
    <div className="container mt-3">
      <h5 style={{
        color: "#3a57e8",
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        gap: "6px"
      }}>
        🎵 Gain D3 Graph
      </h5>

      <svg
        ref={svgRef}
        width="100%"
        height="250"
        className="border rounded shadow-sm"
        style={{ background: "white" }}
      />
    </div>
  );
}
