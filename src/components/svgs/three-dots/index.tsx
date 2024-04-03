import type { Component, JSX } from "solid-js";
import { cn } from "~/utils";

type Props = JSX.SvgSVGAttributes<SVGSVGElement>;

const ThreeDots: Component<Props> = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    class={cn("h-6 w-6", props.class)}
  >
    <circle
      class="animate-threeDotsOne"
      fill="currentColor"
      cx="4"
      cy="12"
      r="3"
    />
    <circle
      class="animate-threeDotsTwo"
      fill="currentColor"
      cx="12"
      cy="12"
      r="3"
    />
    <circle
      class="animate-threeDotsThree"
      fill="currentColor"
      cx="20"
      cy="12"
      r="3"
    />
  </svg>
);

export default ThreeDots;
