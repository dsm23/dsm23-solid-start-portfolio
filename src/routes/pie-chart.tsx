import { JSX, For } from "solid-js";
import { pie as d3Pie, arc as d3Arc } from "d3-shape";
import { Main } from "~/components";
import StyledGoBack from "~/components/styled-go-back";

let height = 100;
let width = 100;
let innerRadius = 0; // inner radius of pie, in pixels (non-zero for donut)
let outerRadius = Math.min(width, height) / 2; // outer radius of pie, in pixels
let labelRadius = innerRadius * 0.2 + outerRadius * 1.2; // center radius of labels

let stroke = innerRadius > 0 ? "none" : "white"; // stroke separating widths
let strokeWidth = 1; // width of stroke separating wedges
let strokeLinejoin: JSX.GSVGAttributes<SVGGElement>["stroke-linejoin"] =
  "round"; // line join of stroke separating wedges
let padAngle = stroke === "none" ? 1 / outerRadius : 0; // angular separation between wedges

const PieChart = () => {
  // const data = [1, 1, 2, 3, 5, 8, 13, 21];

  const data = [
    {
      size: 1,
      label: "haskell",
      color: "rgb(100,180,200)",
    },
    {
      size: 2,
      label: "python",
      color: "rgb(150,200,250)",
    },
    {
      size: 3,
      label: "elixir",
      color: "rgb(80,100,150)",
    },
    {
      size: 4,
      label: "go",
      color: "rgb(100,180,200)",
    },
    {
      size: 5,
      label: "rust",
      color: "rgb(150,200,250)",
    },
  ];

  let angle = Math.PI * 2;

  // const N = d3.map(data, name);
  // const V = d3.map(data, value);
  // const I = d3.range(N.length).filter(i => !isNaN(V[i]));

  // const arcs = pie()(data);

  const arcs = d3Pie().padAngle(padAngle)(data.map((obj) => obj.size));
  const arcPaths = d3Arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const arcLabel = d3Arc().innerRadius(labelRadius).outerRadius(labelRadius);

  return (
    <Main class="w-full px-6 py-8">
      <StyledGoBack class="mb-4" href="/#projects" />

      <h1 class="text-4xl uppercase tracking-widest text-sky-600">Pie Chart</h1>
    </Main>
  );
};

export default PieChart;
