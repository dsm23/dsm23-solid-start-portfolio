import { Component, JSX } from "solid-js";
import cx from "clsx";

type Props = JSX.SvgSVGAttributes<SVGSVGElement>;

const Cross: Component<Props> = (props) => (
  <svg
    {...props}
    width={24}
    height={24}
    fill="none"
    class={cx("text-white", props.class)}
  >
    <path
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke-miterlimit={10}
      stroke="currentColor"
      d="M3 3l18 18M3 21L21 3"
    />
  </svg>
);

export default Cross;
