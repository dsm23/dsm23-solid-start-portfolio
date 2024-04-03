import type { Component, JSX } from "solid-js";
import cx from "clsx";

import styles from "./styles.module.css";

type Props = JSX.HTMLAttributes<HTMLDivElement>;

const Tooltip: Component<Props> = (props) => (
  <div
    data-tip-position="top"
    {...props}
    inert={true}
    role="tooltip"
    class={cx(styles.tooltip, props.class)}
  >
    {props.children}
  </div>
);

export default Tooltip;
