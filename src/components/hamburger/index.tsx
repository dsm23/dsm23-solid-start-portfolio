import { splitProps } from "solid-js";
import type { Component, JSX } from "solid-js";
import cx from "clsx";

import styles from "./styles.module.css";

interface Props extends JSX.SvgSVGAttributes<SVGSVGElement> {
  open: boolean;
}

const Hamburger: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ["class", "open"]);

  return (
    <svg
      {...others}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      class={cx(styles.hamburger, { [styles.open]: local.open }, local.class)}
      viewBox="0 0 100 100"
    >
      <rect
        class={`${styles.line} ${styles.top}`}
        width="80"
        height="10"
        x="10"
        y="20"
        rx="5"
      />
      <rect
        class={`${styles.line} ${styles.middle}`}
        width="80"
        height="10"
        x="10"
        y="45"
        rx="5"
      />
      <rect
        class={`${styles.line} ${styles.bottom}`}
        width="80"
        height="10"
        x="10"
        y="70"
        rx="5"
      />
    </svg>
  );
};

export default Hamburger;
