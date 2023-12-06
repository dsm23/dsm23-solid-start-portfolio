import { Component, JSX } from "solid-js";
import { cn } from "~/utils";

type Props = JSX.SvgSVGAttributes<SVGSVGElement>;

const ThreeDots: Component<Props> = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    class={cn("animae h-6 w-6", props.class)}
  >
    {/* <style>.spinner_S1WN{animation:spinner_MGfb .8s linear infinite;animation-delay:-.8s}.spinner_Km9P{animation-delay:-.65s}.spinner_JApP{animation-delay:-.5s}@keyframes spinner_MGfb{93.75%,100%{opacity:.2}}</style> */}
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
