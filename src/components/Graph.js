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
        const gainValue = parseFloat(match[1]);
        setData((prev) => {
          const next = [...prev, gainValue];
          if (next.length > MAX_POINTS) next.shift(); 
          return next;
        });
      }
    };
    window.addEventListener("d3Data", handler);
    return () => window.removeEventListener("d3Data", handler);
  }, []);

  
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const { width, height } = svgRef.current.getBoundingClientRect();
    svg.selectAll("*").remove();

    if (data.length === 0) return;

    const margin = { top: 10, right: 15, bottom: 25, left: 35 };
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    const x = d3.scaleLinear().domain([0, data.length - 1]).range([0, w]);
    const y = d3.scaleLinear().domain([0, d3.max(data) || 1]).nice().range([h, 0]);

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    
    const grad = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "gain-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
    grad.append("stop").attr("offset", "0%").attr("stop-color", "#9b5de5");
    grad.append("stop").attr("offset", "100%").attr("stop-color", "#00c2ff");

    const line = d3
      .line()
      .x((_, i) => x(i))
      .y((d) => y(d))
      .curve(d3.curveCatmullRom.alpha(0.6));

   
    g.append("g").attr("transform", `translate(0,${h})`).call(d3.axisBottom(x).ticks(5));
    g.append("g").call(d3.axisLeft(y).ticks(5));

   
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "url(#gain-gradient)")
      .attr("stroke-width", 2.5)
      .attr("d", line);

    
    g.append("circle")
      .attr("r", 4)
      .attr("cx", x(data.length - 1))
      .attr("cy", y(data[data.length - 1]))
      .attr("fill", "#ff7f50");

   
    g.append("text")
      .text(`Gain: ${data[data.length - 1].toFixed(2)}`)
      .attr("x", 10)
      .attr("y", -2)
      .attr("fill", "#5a189a")
      .attr("font-weight", "bold");
  }, [data]);

  return (
    <div className="container mt-3">
      <h5 style={{ color: "#5a189a", fontWeight: 700 }}>🎵 Gain Visualizer</h5>
      <svg ref={svgRef} width="100%" height="250" className="border rounded shadow-sm" />
    </div>
  );
}
