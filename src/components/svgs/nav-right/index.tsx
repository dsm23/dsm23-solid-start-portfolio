import type { Component, JSX } from "solid-js";
import cx from "clsx";

type Props = JSX.SvgSVGAttributes<SVGSVGElement>;

const NavRight: Component<Props> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    class={cx("text-sky-700", props.class)}
  >
    <path fill="currentColor" d="M2 3l20 9-20 9 5-9-5-9z" />
  </svg>
);

export default NavRight;
