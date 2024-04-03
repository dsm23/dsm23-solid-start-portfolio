import type { Component, JSX } from "solid-js";
import cx from "clsx";

type Props = JSX.SvgSVGAttributes<SVGSVGElement>;

const EmptyStar: Component<Props> = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    class={cx("text-yellow-500", props.class)}
  >
    <path
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke-miterlimit={10}
      stroke="currentColor"
      d="M12 2l3 7h7l-5 6 2 7-7-4-7 4 2-7-5-6h7l3-7z"
    />
  </svg>
);

export default EmptyStar;
