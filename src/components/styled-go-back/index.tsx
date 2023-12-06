import { Component } from "solid-js";
import { A } from "solid-start";
import { AnchorProps } from "@solidjs/router";
import cx from "clsx";
import { GoBack } from "../svgs";

import styles from "./styles.module.css";

export const Link: Component<AnchorProps> = (props) => (
  <A {...props} class={cx(styles.anchor, "w-min", props.class)}>
    <GoBack class={cx(styles.svg, "h-8 w-8")} aria-label="Go Back" />
  </A>
);

export default Link;
