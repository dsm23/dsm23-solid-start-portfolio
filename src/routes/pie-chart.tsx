import { For } from "solid-js";
import { pie as d3Pie, arc as d3Arc } from "d3-shape";
import type { PieArcDatum } from "d3-shape";
import Main from "~/components/main";
import StyledGoBack from "~/components/styled-go-back";

const height = 100;
const width = 100;
const innerRadius = 0;
const outerRadius = Math.min(width, height) / 2;
const labelRadius = innerRadius * 0.2 + outerRadius * 1.2;
const stroke = innerRadius > 0 ? "none" : "white";
const strokeWidth = 1;
const strokeLinejoin = "round";
const padAngle = stroke === "none" ? 1 / outerRadius : 0;

const data = [
  { size: 1, label: "haskell", color: "rgb(100,180,200)" },
  { size: 2, label: "python", color: "rgb(150,200,250)" },
  { size: 3, label: "elixir", color: "rgb(80,100,150)" },
  { size: 4, label: "go", color: "rgb(100,180,200)" },
  { size: 5, label: "rust", color: "rgb(150,200,250)" },
];

const PieChart = () => {
  const arcs = d3Pie<number>().padAngle(padAngle)(data.map((d) => d.size));

  const arcPaths = d3Arc<PieArcDatum<number>>()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  const arcLabel = d3Arc<PieArcDatum<number>>()
    .innerRadius(labelRadius)
    .outerRadius(labelRadius);

  return (
    <Main class="w-full py-8 px-6">
      <StyledGoBack class="mb-4" href="/#projects" />

      <h1 class="text-4xl uppercase tracking-widest text-sky-600">Pie Chart</h1>
      <svg viewBox="-200 -200 200 200" class="max-w-[700px]">
        <g transform="translate(-100,-100)">
          <For each={arcs}>
            {(arc, index) => {
              const arcData = data[index()];
              const arcPath = arcPaths(arc) as string;
              const arcLabelPosition = arcLabel.centroid(arc);

              return (
                <g
                  stroke={stroke}
                  stroke-width={strokeWidth}
                  stroke-linejoin={strokeLinejoin}
                >
                  <path d={arcPath} fill={arcData.color} />

                  <text
                    x={arcLabelPosition[0]}
                    y={arcLabelPosition[1]}
                    text-anchor="middle"
                    dominant-baseline="middle"
                  >
                    {arcData.label}
                  </text>
                </g>
              );
            }}
          </For>
        </g>
      </svg>
    </Main>
  );
};

export default PieChart;
