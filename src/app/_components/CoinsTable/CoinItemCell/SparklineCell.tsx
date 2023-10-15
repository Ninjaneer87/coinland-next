import React, { memo, useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import { commonColors } from "@nextui-org/react";
import { useMediaQueryContext } from "@/context/mediaQueryContext";

type Props = {
  data: number[];
};
function SparklineCell({ data }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const minNum = useMemo(() => Math.min(...data), [data]);
  const maxNum = useMemo(() => Math.max(...data), [data]);
  const isPumping = useMemo(() => data[data.length - 1] > data[0], [data]);
  const { maxMD } = useMediaQueryContext();

  useEffect(() => {
    const w = maxMD ? 120 : 180;
    const h = maxMD ? 50 : 70;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style(
        "background-color",
        isPumping ? "rgb(162 233 193 / 0.2)" : "rgb(250 160 191 / 0.2)"
      );

    // setting up the scaling
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([10, w - 10]);
    const yScale = d3
      .scaleLinear()
      .domain([minNum, maxNum])
      .range([h - 10, 10]);
    const generateScaledLine = d3
      .line()
      .x((d, i) => xScale(i))
      .y(yScale as any)
      .curve(d3.curveCardinal);

    // setting up the line
    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("d", (d) => generateScaledLine(d as any))
      .attr("fill", "none")
      .attr(
        "stroke",
        isPumping ? commonColors.green[500] : commonColors.red[500]
      );
  }, []);

  return (
    <div className="flex justify-end">
      <svg className="rounded-lg" ref={svgRef}></svg>
    </div>
  );
}

export default memo(SparklineCell);
