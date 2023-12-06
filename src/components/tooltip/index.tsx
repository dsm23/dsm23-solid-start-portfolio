import { Component, JSX } from "solid-js";
import cx from "clsx";

import styles from "./styles.module.css";

type Props = JSX.HTMLAttributes<HTMLDivElement>;

const Tooltip: Component<Props> = ({
  children,
  class: className,
  ref,
  ...props
}) => (
  <div
    data-tip-position="top"
    {...props}
    inert="true"
    role="tooltip"
    className={cx(styles.tooltip, className)}
    ref={ref}
  >
    {children}
  </div>
);

export default Tooltip;
