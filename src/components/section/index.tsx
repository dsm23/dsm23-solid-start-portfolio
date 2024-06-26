import { splitProps } from "solid-js";
import type { Component, JSX } from "solid-js";
import cx from "clsx";
import { registerNavObserver } from "../nav-observer";

import styles from "./styles.module.css";

0 && registerNavObserver;

type Props = JSX.HTMLAttributes<HTMLElement>;

const Section: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ["children", "class"]);

  return (
    <section
      {...others}
      class={cx(styles.section, local.class)}
      use:registerNavObserver
    >
      <div class={styles.centering}>
        <div class="flex-grow-0 lg:flex-grow min-w-full py-8 px-4 lg:py-64 lg:px-32">
          {local.children}
        </div>
      </div>
    </section>
  );
};

export default Section;
