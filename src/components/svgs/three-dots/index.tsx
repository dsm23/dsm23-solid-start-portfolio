import type { Component, JSX } from "solid-js";
import cn from "~/utils/class-names";

import styles from "./styles.module.css";

type Props = JSX.SvgSVGAttributes<SVGSVGElement>;

const ThreeDots: Component<Props> = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    class={cn("h-6 w-6", props.class)}
  >
    <circle class={styles.dots} fill="currentColor" cx="4" cy="12" r="3" />
    <circle
      class={cn(styles.dots, styles.dotTwo)}
      fill="currentColor"
      cx="12"
      cy="12"
      r="3"
    />
    <circle
      class={cn(styles.dots, styles.dotThree)}
      fill="currentColor"
      cx="20"
      cy="12"
      r="3"
    />
  </svg>
);

export default ThreeDots;
