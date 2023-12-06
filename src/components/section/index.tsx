import { Component, JSX, splitProps } from "solid-js";
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
        <div class="min-w-full flex-grow-0 px-4 py-8 lg:flex-grow lg:px-32 lg:py-64">
          {local.children}
        </div>
      </div>
    </section>
  );
};

export default Section;
