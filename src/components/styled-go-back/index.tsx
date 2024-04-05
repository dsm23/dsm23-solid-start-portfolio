import type { Component } from "solid-js";
import { A } from "@solidjs/router";
import type { AnchorProps } from "@solidjs/router";
import GoBack from "~/components/svgs/go-back";
import cn from "~/utils/class-names";

import styles from "./styles.module.css";

export const Link: Component<AnchorProps> = (props) => (
  <A {...props} class={cn(styles.anchor, props.class)}>
    <GoBack class={cn(styles.svg, "h-8 w-8")} aria-label="Go Back" />
  </A>
);

export default Link;
